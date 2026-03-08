const express = require('express');
const plaidClient = require('../config/plaid');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');
const { GOAL_CATEGORIES } = require('../config/categoryMap');
const { getMonthlyActualsByCategoryAll } = require('../services/healthService');

const router = express.Router();

async function fetchAndSaveTransactions(userId, plaidItems) {
    const now = new Date();
    const endDate = now.toISOString().split('T')[0];
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 30);
    const startDateStr = startDate.toISOString().split('T')[0];

    const allTransactions = [];

    for (const item of plaidItems) {
        try {
            const response = await plaidClient.transactionsGet({
                access_token: item.accessToken,
                start_date: startDateStr,
                end_date: endDate,
            });
            const transactions = response.data.transactions || [];

            for (const t of transactions) {
                const pfc = t.personal_finance_category || {};
                const personalFinanceCategory = {
                    primary: pfc.primary || '',
                    detailed: pfc.detailed || '',
                    confidenceLevel: pfc.confidence_level || '',
                };

                const existing = await Transaction.findOne({
                    plaidTransactionId: t.transaction_id,
                });
                if (!existing) {
                    await Transaction.create({
                        userId,
                        plaidTransactionId: t.transaction_id,
                        accountId: t.account_id,
                        name: t.name,
                        amount: t.amount,
                        date: new Date(t.date),
                        category: t.category || [],
                        personalFinanceCategory,
                        merchantName: t.merchant_name || '',
                        pending: t.pending || false,
                    });
                }
                allTransactions.push({
                    id: t.transaction_id,
                    name: t.name,
                    amount: t.amount,
                    date: t.date,
                    category: t.category || [],
                    personalFinanceCategory,
                    merchantName: t.merchant_name || '',
                    pending: t.pending || false,
                });
            }
        } catch (itemErr) {
            console.error('Error fetching transactions for item:', itemErr.message);
        }
    }

    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    return allTransactions;
}

router.post('/create-link-token', auth, async (req, res) => {
    try {
        const response = await plaidClient.linkTokenCreate({
            user: { client_user_id: req.user._id.toString() },
            client_name: 'BuddyBudget',
            products: ['transactions'],
            country_codes: ['US'],
            language: 'en',
        });
        res.json({ link_token: response.data.link_token });
    } catch (err) {
        const plaidError = err.response?.data;
        console.error('Plaid link token error:', plaidError || err.message);
        res.status(500).json({
            error: plaidError?.error_message || 'Failed to create link token',
        });
    }
});

router.post('/exchange-token', auth, async (req, res) => {
    try {
        const { public_token } = req.body;
        if (!public_token) {
            return res.status(400).json({ error: 'public_token is required' });
        }

        const exchangeResponse = await plaidClient.itemPublicTokenExchange({
            public_token,
        });
        const { access_token, item_id } = exchangeResponse.data;

        const accountsResponse = await plaidClient.accountsGet({ access_token });
        const accounts = accountsResponse.data.accounts;

        const institutionName = 'Bank';

        const user = await User.findById(req.user._id);
        if (!user.plaidItems) user.plaidItems = [];
        const newItem = { accessToken: access_token, itemId: item_id, institutionName };
        user.plaidItems.push(newItem);
        await user.save();

        fetchAndSaveTransactions(user._id, [newItem]).catch((err) =>
            console.error('Background transaction fetch after link:', err.message)
        );

        res.json({
            success: true,
            accounts: accounts.map((a) => ({
                account_id: a.account_id,
                name: a.name,
                type: a.type,
                subtype: a.subtype,
            })),
        });
    } catch (err) {
        const plaidError = err.response?.data;
        console.error('Plaid exchange error:', plaidError || err.message);
        res.status(500).json({
            error: plaidError?.error_message || 'Failed to exchange token',
        });
    }
});

router.post('/refresh-transactions', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.plaidItems || user.plaidItems.length === 0) {
            return res.status(400).json({ error: 'No linked accounts. Connect a bank first.' });
        }

        const results = { refreshed: 0, errors: [] };

        for (const item of user.plaidItems) {
            try {
                await plaidClient.transactionsRefresh({
                    access_token: item.accessToken,
                });
                results.refreshed += 1;
            } catch (itemErr) {
                const msg = itemErr.response?.data?.error_message || itemErr.message;
                results.errors.push({ itemId: item.itemId || 'unknown', message: msg });
                console.error('Transactions refresh error for item:', msg);
            }
        }

        res.json({
            success: results.errors.length === 0,
            refreshed: results.refreshed,
            errors: results.errors.length > 0 ? results.errors : undefined,
        });
    } catch (err) {
        console.error('Plaid refresh error:', err.message);
        res.status(500).json({ error: 'Failed to refresh transactions' });
    }
});

router.post('/sync-transactions', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.plaidItems || user.plaidItems.length === 0) {
            return res.json({ synced: 0 });
        }
        const txns = await fetchAndSaveTransactions(user._id, user.plaidItems);
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const actualsByCategory = await getMonthlyActualsByCategoryAll(user._id, month);
        for (const cat of GOAL_CATEGORIES) {
            await Goal.updateOne(
                { userId: user._id, month, category: cat },
                { $set: { currentAmount: actualsByCategory[cat] ?? 0 } }
            );
        }
        res.json({ synced: txns.length });
    } catch (err) {
        console.error('Sync transactions error:', err.message);
        res.status(500).json({ error: 'Failed to sync transactions' });
    }
});

router.get('/transactions', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

        if (!user.plaidItems || user.plaidItems.length === 0) {
            const actualsByCategory = await getMonthlyActualsByCategoryAll(user._id, month);
            return res.json({ transactions: [], actualsByCategory, month });
        }

        const allTransactions = await fetchAndSaveTransactions(user._id, user.plaidItems);
        const actualsByCategory = await getMonthlyActualsByCategoryAll(user._id, month);

        res.json({
            transactions: allTransactions,
            actualsByCategory,
            month,
        });
    } catch (err) {
        console.error('Plaid transactions error:', err.message);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

module.exports = router;

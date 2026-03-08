const express = require('express');
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');
const { GOAL_CATEGORIES } = require('../config/categoryMap');

const router = express.Router();

function getCurrentMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

router.post('/', auth, async (req, res) => {
    try {
        const { goals } = req.body;
        if (!goals || typeof goals !== 'object') {
            return res.status(400).json({ error: 'goals object is required' });
        }

        const month = getCurrentMonth();
        const userId = req.user._id;

        for (const category of GOAL_CATEGORIES) {
            const raw = goals[category];
            const targetAmount = typeof raw === 'number' ? raw : parseFloat(String(raw || '0').replace(/,/g, '')) || 0;

            const name = category
                .split('_')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');

            await Goal.findOneAndUpdate(
                { userId, month, category },
                {
                    userId,
                    month,
                    category,
                    name,
                    targetAmount: Math.max(0, targetAmount),
                    currentAmount: 0,
                },
                { upsert: true, new: true }
            );
        }

        res.json({ success: true, month });
    } catch (err) {
        console.error('Goals save error:', err.message);
        res.status(500).json({ error: 'Failed to save goals' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const month = req.query.month || getCurrentMonth();
        const goals = await Goal.find({ userId: req.user._id, month }).lean();

        const byCategory = {};
        for (const cat of GOAL_CATEGORIES) {
            const g = goals.find((x) => x.category === cat);
            byCategory[cat] = g ? g.targetAmount : 0;
        }

        res.json({ goals: byCategory, month });
    } catch (err) {
        console.error('Goals fetch error:', err.message);
        res.status(500).json({ error: 'Failed to fetch goals' });
    }
});

module.exports = router;

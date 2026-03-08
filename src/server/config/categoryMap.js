/**
 * Goal categories aligned with custom Plaid test credentials.
 * Maps Plaid personal_finance_category.primary to our goal category keys.
 */
const GOAL_CATEGORIES = [
    'food_and_drink',
    'entertainment',
    'transportation',
    'savings',
    'shopping',
    'miscellaneous',
];

const PLAID_TO_GOAL_MAP = {
    FOOD_AND_DRINK: 'food_and_drink',
    ENTERTAINMENT: 'entertainment',
    RECREATION: 'entertainment',
    TRANSPORTATION: 'transportation',
    TRAVEL: 'transportation',
    GENERAL_MERCHANDISE: 'shopping',
    SHOPPING: 'shopping',
    LOAN_PAYMENTS: 'miscellaneous',
    BANK_FEES: 'miscellaneous',
    FINANCIAL_SERVICES: 'miscellaneous',
    RENT_AND_UTILITIES: 'miscellaneous',
    PERSONAL_CARE: 'miscellaneous',
    HEALTHCARE: 'miscellaneous',
    INCOME: 'savings',
    TRANSFER_IN: 'savings',
    TRANSFER_OUT: 'savings',
};

function plaidPrimaryToGoalCategory(plaidPrimary) {
    if (!plaidPrimary) return 'miscellaneous';
    return PLAID_TO_GOAL_MAP[plaidPrimary] || 'miscellaneous';
}

module.exports = {
    GOAL_CATEGORIES,
    PLAID_TO_GOAL_MAP,
    plaidPrimaryToGoalCategory,
};

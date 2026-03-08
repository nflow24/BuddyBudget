/**
 * Health formula config for budget-driven character health.
 * Uses the five non-miscellaneous categories; miscellaneous is excluded.
 */

const HEALTH_CATEGORIES = [
    'food_and_drink',
    'entertainment',
    'transportation',
    'savings',
    'shopping',
];

const WEIGHTS = {
    food_and_drink: 0.25,
    entertainment: 0.20,
    shopping: 0.20,
    savings: 0.25,
    transportation: 0.10,
};

const PENALTY_FACTORS = {
    food_and_drink: 1.0,
    entertainment: 1.2,
    shopping: 1.2,
    transportation: 0.6,
};

const SAVINGS_CATEGORY = 'savings';

module.exports = {
    HEALTH_CATEGORIES,
    WEIGHTS,
    PENALTY_FACTORS,
    SAVINGS_CATEGORY,
};

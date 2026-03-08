const Transaction = require('../models/Transaction');
const Goal = require('../models/Goal');
const { plaidPrimaryToGoalCategory, GOAL_CATEGORIES } = require('../config/categoryMap');
const {
    HEALTH_CATEGORIES,
    WEIGHTS,
    PENALTY_FACTORS,
    SAVINGS_CATEGORY,
} = require('../config/healthFormula');

function getMonthBounds(monthStr) {
    const [year, month] = monthStr.split('-').map(Number);
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);
    return { start, end };
}

/**
 * Aggregates this month's transactions into the five tracked goal categories.
 * Spending categories use abs(amount); savings uses max(0, sum(amount)).
 * @param {ObjectId} userId
 * @param {string} month - "YYYY-MM"
 * @returns {Object} Map of category -> actual amount
 */
async function getMonthlyActualsByCategory(userId, month) {
    const { start, end } = getMonthBounds(month);
    const transactions = await Transaction.find({
        userId,
        date: { $gte: start, $lte: end },
    }).lean();

    const actuals = {};
    for (const cat of HEALTH_CATEGORIES) {
        actuals[cat] = 0;
    }

    for (const t of transactions) {
        const primary = t.personalFinanceCategory?.primary || '';
        const goalCategory = plaidPrimaryToGoalCategory(primary);
        if (!HEALTH_CATEGORIES.includes(goalCategory)) continue;

        const amount = t.amount || 0;
        if (goalCategory === SAVINGS_CATEGORY) {
            actuals[goalCategory] += amount;
        } else {
            actuals[goalCategory] += Math.abs(amount);
        }
    }

    for (const cat of HEALTH_CATEGORIES) {
        if (cat === SAVINGS_CATEGORY) {
            actuals[cat] = Math.max(0, actuals[cat]);
        }
    }

    return actuals;
}

/**
 * Aggregates this month's transactions into all goal categories (including miscellaneous).
 * @param {ObjectId} userId
 * @param {string} month - "YYYY-MM"
 * @returns {Object} Map of category -> actual amount
 */
async function getMonthlyActualsByCategoryAll(userId, month) {
    const { start, end } = getMonthBounds(month);
    const transactions = await Transaction.find({
        userId,
        date: { $gte: start, $lte: end },
    }).lean();

    const actuals = {};
    for (const cat of GOAL_CATEGORIES) {
        actuals[cat] = 0;
    }

    for (const t of transactions) {
        const primary = t.personalFinanceCategory?.primary || '';
        const goalCategory = plaidPrimaryToGoalCategory(primary);

        const amount = t.amount || 0;
        if (goalCategory === SAVINGS_CATEGORY) {
            actuals[goalCategory] += amount;
        } else {
            actuals[goalCategory] += Math.abs(amount);
        }
    }

    if (actuals[SAVINGS_CATEGORY] !== undefined) {
        actuals[SAVINGS_CATEGORY] = Math.max(0, actuals[SAVINGS_CATEGORY]);
    }

    return actuals;
}

/**
 * Computes a 0-100 health score from goals and actuals.
 * @param {Object} goalsByCategory - category -> targetAmount
 * @param {Object} actualsByCategory - category -> actual amount
 * @returns {number} 0-100
 */
function computeHealth(goalsByCategory, actualsByCategory) {
    let weightedSum = 0;
    let totalWeight = 0;

    for (const cat of HEALTH_CATEGORIES) {
        const goal = goalsByCategory[cat] ?? 0;
        const actual = actualsByCategory[cat] ?? 0;
        const weight = WEIGHTS[cat] ?? 0;
        if (weight <= 0) continue;

        let score;
        if (cat === SAVINGS_CATEGORY) {
            if (goal <= 0) {
                score = 1;
            } else {
                score = Math.min(actual / goal, 1);
            }
        } else {
            if (goal <= 0) {
                score = 1;
            } else if (actual <= goal) {
                score = 1;
            } else {
                const overageRatio = (actual - goal) / goal;
                const penaltyFactor = PENALTY_FACTORS[cat] ?? 1;
                score = Math.max(0, 1 - overageRatio * penaltyFactor);
            }
        }

        weightedSum += score * weight;
        totalWeight += weight;
    }

    if (totalWeight <= 0) return 100;
    const raw = (weightedSum / totalWeight) * 100;
    return Math.round(Math.max(0, Math.min(100, raw)));
}

/**
 * Returns health and optionally actuals for a user/month.
 * Uses Goal.currentAmount from MongoDB (not Transaction aggregation).
 * @param {ObjectId} userId
 * @param {string} month - "YYYY-MM"
 * @returns {{ health: number, actuals?: Object }}
 */
async function getHealthForUser(userId, month) {
    const goals = await Goal.find({ userId, month }).lean();

    const goalsByCategory = {};
    const actualsByCategory = {};
    for (const cat of HEALTH_CATEGORIES) {
        goalsByCategory[cat] = 0;
        actualsByCategory[cat] = 0;
    }
    for (const g of goals) {
        if (HEALTH_CATEGORIES.includes(g.category)) {
            goalsByCategory[g.category] = g.targetAmount ?? 0;
            actualsByCategory[g.category] = g.currentAmount ?? 0;
        }
    }

    const health = computeHealth(goalsByCategory, actualsByCategory);
    return { health, actuals: actualsByCategory };
}

module.exports = {
    getMonthBounds,
    getMonthlyActualsByCategory,
    getMonthlyActualsByCategoryAll,
    computeHealth,
    getHealthForUser,
};

const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { getHealthForUser } = require('../services/healthService');

const router = express.Router();

function getCurrentMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

router.get('/', auth, async (req, res) => {
    try {
        const month = req.query.month || getCurrentMonth();
        const user = await User.findById(req.user._id).populate('friends', 'name').lean();

        const userIds = [req.user._id];
        const names = { [req.user._id.toString()]: user.name };

        for (const f of user.friends || []) {
            userIds.push(f._id);
            names[f._id.toString()] = f.name;
        }

        const entries = await Promise.all(
            userIds.map(async (userId) => {
                const { health } = await getHealthForUser(userId, month);
                return {
                    userId: userId.toString(),
                    name: names[userId.toString()],
                    health,
                    isUser: userId.toString() === req.user._id.toString(),
                };
            })
        );

        entries.sort((a, b) => b.health - a.health);

        res.json({ leaderboard: entries });
    } catch (err) {
        console.error('Leaderboard fetch error:', err.message);
        res.status(500).json({ error: 'Failed to load leaderboard' });
    }
});

module.exports = router;

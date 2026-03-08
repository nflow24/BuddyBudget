const express = require('express');
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
        const { health } = await getHealthForUser(req.user._id, month);
        res.json({ health });
    } catch (err) {
        console.error('Health fetch error:', err.message);
        res.status(500).json({ error: 'Failed to compute health' });
    }
});

module.exports = router;

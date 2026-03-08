const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');
const { getMonthlyActualsByCategoryAll } = require('../services/healthService');
const { GOAL_CATEGORIES } = require('../config/categoryMap');

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, dob } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        const user = await User.create({
            name,
            email,
            passwordHash: password,
            dob: dob || undefined,
        });

        const token = generateToken(user._id);

        res.status(201).json({ token, user: user.toPublicJSON() });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error during signup' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user._id);

        res.json({ token, user: user.toPublicJSON() });
    } catch (err) {
        res.status(500).json({ error: 'Server error during login' });
    }
});

router.get('/me', auth, async (req, res) => {
    try {
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const [goals, actualsByCategory] = await Promise.all([
            Goal.find({ userId: req.user._id, month }).lean(),
            getMonthlyActualsByCategoryAll(req.user._id, month),
        ]);
        const goalsByCategory = {};
        for (const cat of GOAL_CATEGORIES) {
            const g = goals.find((x) => x.category === cat);
            goalsByCategory[cat] = g ? g.targetAmount : 0;
        }
        res.json({
            user: req.user.toPublicJSON(),
            actualsByCategory,
            goalsByCategory,
            month,
        });
    } catch (err) {
        console.error('Me route error:', err.message);
        res.json({
            user: req.user.toPublicJSON(),
            actualsByCategory: {},
            goalsByCategory: {},
            month: null,
        });
    }
});

router.put('/me/character', auth, async (req, res) => {
    try {
        const { skin, hair, shirt, pants, shoes } = req.body;

        const user = await User.findById(req.user._id);
        if (!user.character) user.character = {};
        if (skin !== undefined) user.character.skin = skin;
        if (hair !== undefined) user.character.hair = hair;
        if (shirt !== undefined) user.character.shirt = shirt;
        if (pants !== undefined) user.character.pants = pants;
        if (shoes !== undefined) user.character.shoes = shoes;

        await user.save();
        res.json({ user: user.toPublicJSON() });
    } catch (err) {
        res.status(500).json({ error: 'Server error updating character' });
    }
});

module.exports = router;

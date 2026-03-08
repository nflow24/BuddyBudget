const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

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
    res.json({ user: req.user.toPublicJSON() });
});

router.put('/me/character', auth, async (req, res) => {
    try {
        const { skin, hair, clothes, accessories } = req.body;

        const user = await User.findById(req.user._id);
        if (skin !== undefined) user.character.skin = skin;
        if (hair !== undefined) user.character.hair = hair;
        if (clothes !== undefined) user.character.clothes = clothes;
        if (accessories !== undefined) user.character.accessories = accessories;

        await user.save();
        res.json({ user: user.toPublicJSON() });
    } catch (err) {
        res.status(500).json({ error: 'Server error updating character' });
    }
});

module.exports = router;

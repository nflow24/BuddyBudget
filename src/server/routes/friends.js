const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('friends', 'name email')
            .lean();

        const friends = (user.friends || []).map((f) => ({
            _id: f._id,
            name: f.name,
            email: f.email,
        }));

        res.json({ friends });
    } catch (err) {
        console.error('Friends fetch error:', err.message);
        res.status(500).json({ error: 'Failed to load friends' });
    }
});

router.post('/add', auth, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || typeof email !== 'string') {
            return res.status(400).json({ error: 'Email is required' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const targetUser = await User.findOne({ email: normalizedEmail });

        if (!targetUser) {
            return res.status(404).json({ error: 'User not found with that email' });
        }

        const currentUserId = req.user._id.toString();
        const targetUserId = targetUser._id.toString();

        if (currentUserId === targetUserId) {
            return res.status(400).json({ error: "You can't add yourself as a friend" });
        }

        const currentUser = await User.findById(req.user._id);
        const friendIds = (currentUser.friends || []).map((id) => id.toString());

        if (friendIds.includes(targetUserId)) {
            return res.status(400).json({ error: 'Already friends with this user' });
        }

        currentUser.friends.push(targetUser._id);
        targetUser.friends.push(currentUser._id);

        await Promise.all([currentUser.save(), targetUser.save()]);

        res.status(201).json({
            friend: {
                _id: targetUser._id,
                name: targetUser.name,
                email: targetUser.email,
            },
        });
    } catch (err) {
        console.error('Add friend error:', err.message);
        res.status(500).json({ error: 'Failed to add friend' });
    }
});

module.exports = router;

const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Goal name is required'],
        trim: true,
    },
    targetAmount: {
        type: Number,
        required: [true, 'Target amount is required'],
        min: 0,
    },
    currentAmount: {
        type: Number,
        default: 0,
        min: 0,
    },
    month: {
        type: String,
        required: [true, 'Month is required'],
    },
    category: {
        type: String,
        trim: true,
        default: 'General',
    },
}, { timestamps: true });

goalSchema.index({ userId: 1, month: 1 });

module.exports = mongoose.model('Goal', goalSchema);

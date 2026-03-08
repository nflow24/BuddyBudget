const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    plaidTransactionId: {
        type: String,
        required: true,
        unique: true,
    },
    accountId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: [String],
        default: [],
    },
    pending: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

transactionSchema.index({ userId: 1, date: -1 });
// plaidTransactionId index is already created by unique: true on the field above

module.exports = mongoose.model('Transaction', transactionSchema);

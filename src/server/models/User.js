const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    passwordHash: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    character: {
        type: {
            skin: { type: String, default: '' },
            hair: { type: String, default: '' },
            clothes: { type: String, default: '' },
            accessories: { type: [String], default: [] },
        },
        default: () => ({}),
    },
    plaidItems: [{
        accessToken: String,
        itemId: String,
        institutionName: String,
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('passwordHash')) return;
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.methods.toPublicJSON = function () {
    const obj = this.toObject();
    delete obj.passwordHash;
    delete obj.plaidItems;
    return obj;
};

module.exports = mongoose.model('User', userSchema);

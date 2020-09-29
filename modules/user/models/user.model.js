const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    roles: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    active_role: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: mongoose.Schema.Types.ObjectId
    },
    activationOtp: Number,
    activationKey: String,
    email: String,
    mobileNo: Number
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('User', UserSchema);
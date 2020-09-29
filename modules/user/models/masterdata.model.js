const mongoose = require('mongoose');

const MasterDataSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: String,
    summary: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MasterData'
    },
    displayOrder: Number,
    data_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('MasterData', MasterDataSchema);
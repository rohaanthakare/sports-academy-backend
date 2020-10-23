const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    description: String,
    features: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feature'
    }]
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Role', RoleSchema);
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    description: String,
    permissions: [{
        type: mongoose.Schema.Types.ObjectId
    }]
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Role', RoleSchema);
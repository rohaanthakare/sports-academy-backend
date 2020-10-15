const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
    code: String,
    name: String,
    title: String,
    displayOrder: Number,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feature'
    },
    isMenuFeature: Boolean,
    isToolbarFeature: Boolean,
    isAppFeature: Boolean,
    isWebFeature: Boolean,
    featureType: {
        type: String,
        enum: ['list', 'create', 'edit', 'delete', 'custom']
    },
    featureRoute: String,
    featureWebIconClass: String,
    featureAppIconClass: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Feature', FeatureSchema);
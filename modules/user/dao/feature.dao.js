const Feature = require('../models/feature.model');
module.exports = {
    getFeatureByCode
}

async function getFeatureByCode(featureCode) {
    try {
        let feature = await Feature.findOne({
            code: featureCode
        });
        return feature;
    } catch (error) {
        throw(error);
    }
}
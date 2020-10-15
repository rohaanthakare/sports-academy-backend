const Feature = require('../models/feature.model');
const FeatureDao = require('../dao/feature.dao');
module.exports = {
    createFeature
}

async function createFeature(req, res) {
    try {
        let featureParams = req.body;
        if(typeof featureParams.parent === 'string') {
            if(featureParams.parent === '') {
                delete featureParams.parent;
            } else {
                let parentFeature = await FeatureDao.getFeatureByCode(featureParams.parent);
                featureParams.parent = parentFeature._id;
            }
        }
        let feature = await new Feature(featureParams).save();
        res.send({
            status: true,
            message: 'Feature created successfully',
            feature
        });
    } catch (error) {
        let errorMsg = (typeof error === 'string') ? error : GlobalEnum.ERRORS[500];
        res.status(500).send({
            message: errorMsg
        });
    }
}
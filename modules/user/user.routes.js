const express = require('express');
const UserCtrl = require('./controllers/user.controller');
const MasterDataCtrl = require('./controllers/masterdata.controller');
const FeatureCtrl = require('./controllers/feature.controller');

const userRoutes = express.Router();
userRoutes.post('/register_user', UserCtrl.registerUser);
userRoutes.post('/authenticate_user', UserCtrl.authenticateUser);

userRoutes.post('/create_master_data', MasterDataCtrl.createMasterData);

userRoutes.post('/create_feature', FeatureCtrl.createFeature);
module.exports = userRoutes;
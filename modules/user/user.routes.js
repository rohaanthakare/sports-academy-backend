const express = require('express');
const UserCtrl = require('./controllers/user.controller');
const MasterDataCtrl = require('./controllers/masterdata.controller');
const FeatureCtrl = require('./controllers/feature.controller');
const RoleCtrl = require('./controllers/role.controller');

const userRoutes = express.Router();
userRoutes.post('/register_user', UserCtrl.registerUser);
userRoutes.post('/authenticate_user', UserCtrl.authenticateUser);

userRoutes.post('/create_master_data', MasterDataCtrl.createMasterData);

userRoutes.post('/create_feature', FeatureCtrl.createFeature);

userRoutes.post('/create_role', RoleCtrl.createRole);
module.exports = userRoutes;
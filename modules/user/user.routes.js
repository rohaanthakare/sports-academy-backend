const express = require('express');
const UserCtrl = require('./controllers/user.controller');
const MasterDataCtrl = require('./controllers/masterdata.controller');
const FeatureCtrl = require('./controllers/feature.controller');
const RoleCtrl = require('./controllers/role.controller');

const userRoutes = express.Router();
userRoutes.post('/create_user', UserCtrl.createNewUser);
userRoutes.post('/authenticate_user', UserCtrl.authenticateUser);

userRoutes.post('/create_master_data', MasterDataCtrl.createMasterData);

userRoutes.post('/create_feature', FeatureCtrl.createFeature);

userRoutes.post('/create_role', RoleCtrl.createRole);
userRoutes.post('/update_role_feature_map', RoleCtrl.updateRoleFeatureMapping);
userRoutes.get('/get_role_features', RoleCtrl.getRoleFeatures);
module.exports = userRoutes;
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const UserDao = require('./dao/user.dao');
const User = require('./models/user.model');
const Role = require('./models/role.model');
const MasterData = require('./models/masterdata.model');
const RoleDao = require('./dao/role.dao');
const FeatureDao = require('./dao/feature.dao');

module.exports = {
    createNewUser,
    authenticateUser,
    createMasterData,
    updateRoleFeatureMapping
}

async function createNewUser(userParams) {
    try {
        let user = await UserDao.getUserBy('username', userParams.username);
        if (user) {
            throw('Username is not available, please enter another username');
        }
        user = await UserDao.getUserBy('email', userParams.email);
        if (user) {
            throw('Mail ID is already registered, to retrive your password click on forgot password');
        }
        userParams.password = bcrypt.hashSync(userParams.password, 10);
        let role = await RoleDao.getRoleByRoleCode(userParams.active_role);
        userParams.roles = [];
        userParams.roles.push(role._id);
        userParams.active_role = role._id;
        let userStatus = await UserDao.getMasterDataByParentAndCode('USER_STATUS', userParams.status);
        userParams.status = userStatus._id;
        user = await new User(userParams).save();
        
        if (userParams.status === 'NEW') {
            console.log('send user activation mail');
        } else if (userParams.status === 'INVITED') {
            console.log('send user invitation mail');
        }
    } catch (error) {
        throw(error);
    } 
}

async function authenticateUser(userParams) {
    try {
        let user = await User.findOne({
            username: userParams.username
        }).lean();

        if (!user) {
            throw('User does not exist, please register');
        }
        // userParams.password = bcrypt.hashSync(userParams.password, 10); 
        if (!bcrypt.compareSync(userParams.password, user.password)) {
            throw('Invalid username or password');
        }

        return getUserToken(user);
    } catch (error) {
        throw(error);
    }
}

async function getUserToken(userData) {
    try {
        let user_data = _.pick(userData, ['_id', 'username', 'active_role', 'email', 'mobile_no']);
        let role = await Role.findById(user_data.active_role);
        user_data.active_role = role.code;
        let user_token = jwt.sign(user_data, process.env.TOKEN_SECRET, {
            algorithm : "HS256",
            expiresIn : 60*60*12
        });
        return {
            user: user_data,
            token: user_token
        };
    } catch (error) {
        throw(error);
    }
}

async function createMasterData(dataParams) {
    try {
        let master_data = await new MasterData(dataParams).save();
        return master_data; 
    } catch (error) {
        throw(error);
    }
}

async function updateRoleFeatureMapping(roleMapParams) {
    try {
        let role = await RoleDao.getRoleByRoleCode(roleMapParams.roleCode);
        let feature = await FeatureDao.getFeatureByCode(roleMapParams.featureCode);
        role = await Role.findByIdAndUpdate(role._id, {
           $addToSet: {
               features: [feature._id]
           } 
        });
        return role; 
    } catch (error) {
        throw(error);
    }
}

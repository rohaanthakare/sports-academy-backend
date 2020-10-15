const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const UserDao = require('./dao/user.dao');
const User = require('./models/user.model');
const MasterData = require('./models/masterdata.model');

module.exports = {
    createNewUser,
    authenticateUser,
    createMasterData
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
        user = await new User(userParams).save();
        let role = await UserDao.getRoleBy('code', userParams.role);
        let userStatus = await UserDao.getMasterDataByParentAndCode('USER_STATUS', userParams.status);
        
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
        
        if (userData.active_role === 'superadmin') {

        }
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
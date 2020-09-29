const bcrypt = require('bcryptjs');
const UserDao = require('./user.dao');
const User = require('./models/user.model');

module.exports = {
    createNewUser
}

async function createNewUser(userParams) {
    try {
        console.log('------Inside create new user workflow----');
        console.log('------Validate unique fields-------------');
        let user = await UserDao.getUserBy('username', userParams.username);
        if (user) {
            throw('Username is not available, please enter another username');
        }
        user = await UserDao.getUserBy('email', userParams.email);
        if (user) {
            throw('Mail ID is already registered, to retrive your password click on forgot password');
        }
        console.log('------Create new user--------------------');
        userParams.password = bcrypt.hashSync(userParams.password, 10);
        user = await new User(userParams).save();
        console.log('------assign role to user----------------');
        let role = await UserDao.getRoleBy('code', userParams.role);
        let userStatus = await UserDao.getMasterDataByParentAndCode('USER_STATUS', userParams.status);
        console.log('------based on user status send mail(new, invite)-----');
        
        if (userParams.status === 'NEW') {
            console.log('send user activation mail');
        } else if (userParams.status === 'INVITED') {
            console.log('send user invitation mail');
        }
        console.log('-----------------------------------------');
    } catch (error) {
        console.log('------Inside catch error----');
        console.log(error);
        throw(error);
    } 
}
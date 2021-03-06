const GlobalEnum = require('../global/global.enumeration');
const UserWorkflow = require('./user.workflow');
module.exports = {
    registerUser
}

async function registerUser(req, res) {
    try {
        let userParams = req.body;
        let user = await UserWorkflow.createNewUser(userParams);
        res.send({
            status: true,
            message: 'User created successfully, activation link sent to your registered mail id',
            user
        });
    } catch (error) {
        let errorMsg = (typeof error === 'string') ? error : GlobalEnum.ERRORS[500];
        res.status(500).send({
            message: errorMsg
        });
    }
}
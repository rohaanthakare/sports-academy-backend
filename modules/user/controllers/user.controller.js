const GlobalEnum = require('../../global/global.enumeration');
const UserWorkflow = require('../user.workflow');
const TrackerMailer = require('../../global/trackermailer.service');
module.exports = {
    registerUser,
    authenticateUser,
    createNewUser,
    mailTester
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

async function authenticateUser(req, res) {
    try {
        let userParams = req.body;
        let response = await UserWorkflow.authenticateUser(userParams);
        res.send({
            status: true,
            message: 'User authenticated successfully',
            user: response.user,
            token: response.token
        });
    } catch (error) {
        let errorMsg = (typeof error === 'string') ? error : GlobalEnum.ERRORS[500];
        res.status(500).send({
            message: errorMsg
        });
    }
}

async function createNewUser(req, res) {
    try {
        let userParams = req.body;
        if (userParams.action === 'register') {
            userParams.status = 'NEW';
            userParams.active_role = (userParams.active_role) ? userParams.active_role : 'DEMO_ROLE';
        } else if (userParams.action === 'upload') {
            userParams.status = 'ACTIVE';
        } 
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

async function mailTester(req, res) {
    try {
        let userParams = req.body;
        console.log('---------------mailTester-------------');
        console.log(userParams);
        await TrackerMailer.testMailTemplate();
        // let user = await UserWorkflow.createNewUser(userParams);
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
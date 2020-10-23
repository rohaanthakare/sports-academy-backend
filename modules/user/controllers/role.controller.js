const GlobalEnum = require('../../global/global.enumeration');
const Role = require('../models/role.model');
const UserWorkflow = require('../user.workflow');
const roleDao = require('../dao/role.dao');
module.exports = {
    createRole, getRoleFeatures,
    updateRoleFeatureMapping
}

async function createRole(req, res) {
    try {
        let roleParams = req.body;
        let role = await new Role(roleParams).save();
        res.send({
            status: true,
            message: 'Role created successfully',
            role
        });
    } catch (error) {
        let errorMsg = (typeof error === 'string') ? error : GlobalEnum.ERRORS[500];
        res.status(500).send({
            message: errorMsg
        });
    }
}

async function updateRoleFeatureMapping(req, res) {
    try {
        let roleParams = req.body;
        let role = await UserWorkflow.updateRoleFeatureMapping(roleParams);
        res.send({
            status: true,
            message: 'Role features updated successfully',
            role
        });
    } catch (error) {
        let errorMsg = (typeof error === 'string') ? error : GlobalEnum.ERRORS[500];
        res.status(500).send({
            message: errorMsg
        });
    }
}

async function getRoleFeatures(req, res) {
    try {
        let roleParams = req.body;
        let role = await Role.findOne({
            code: req.current_user.active_role
        }).populate({
            path: 'features'
        });
        console.log(role.features);
        // let role = await UserWorkflow.updateRoleFeatureMapping(roleParams);
        res.send({
            status: true,
            features: role.features
        });
    } catch (error) {
        let errorMsg = (typeof error === 'string') ? error : GlobalEnum.ERRORS[500];
        res.status(500).send({
            message: errorMsg
        });
    }
}
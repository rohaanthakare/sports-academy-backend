const GlobalEnum = require('../../global/global.enumeration');
const Role = require('../models/role.model');
module.exports = {
    createRole
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
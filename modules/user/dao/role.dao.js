const Role = require('../models/role.model');
module.exports = {
    getRoleByRoleCode
}

async function getRoleByRoleCode(roleCode) {
    try {
        let role = await Role.findOne({
            code: roleCode
        });

        return role;
    } catch (error) {
        throw(error);
    }
}
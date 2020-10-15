const GlobalEnum = require('../../global/global.enumeration');
const MasterData = require('../models/masterdata.model');
const UserWorkflow = require('../user.workflow');
const MasterDataDao = require('../dao/masterdata.dao');
module.exports = {
    createMasterData
}

async function createMasterData(req, res) {
    try {
        let dataParams = req.body;
        if (typeof dataParams.parent === 'string') {
            if (dataParams.parent === '') {
                delete dataParams.parent;
            } else {
                let data = await MasterDataDao.getDataByConfigCode(dataParams.parent);
                dataParams.parent = data._id;
            }
        }
        let master_data = await UserWorkflow.createMasterData(dataParams);
        res.send({
            status: true,
            message: 'Master data created successfully',
            master_data
        });
    } catch (error) {
        let errorMsg = (typeof error === 'string') ? error : GlobalEnum.ERRORS[500];
        res.status(500).send({
            message: errorMsg
        });
    }
}
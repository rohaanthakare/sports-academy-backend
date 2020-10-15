const MasterData = require('../models/masterdata.model');
module.exports = {
    getDataByConfigCode
}

async function getDataByConfigCode(inputCode) {
    try {
        let data = await MasterData.findOne({
            code: inputCode
        });
        return data;
    } catch (error) {
        throw (error);
    }
}
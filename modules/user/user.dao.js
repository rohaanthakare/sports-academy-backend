const User = require('./models/user.model');
const Role = require('./models/role.model');
const MasterData = require('./models/masterdata.model');

module.exports = {
    getUserBy,
    getRoleBy,
    getMasterDataByCode, getMasterDataByParent, getMasterDataByParentAndCode
}

async function getUserBy(searchKey, searchValue) {
    try {
        let query = {};
        query[searchKey] = searchValue;
        let user = await User.findOne(query);
        return user;
    } catch (error) {
        throw(error);
    }
}

async function getRoleBy(searchKey, searchValue) {
    try {
        let query = {};
        query[searchKey] = searchValue;
        let role = await Role.findOne(query);
        return role;
    } catch (error) {
        throw(error);
    }
}

async function getMasterDataByCode(searchKey, searchValue) {
    try {
        let query = {};
        query[searchKey] = searchValue;
        let masterData = await MasterData.findOne(query);
        return masterData;
    } catch (error) {
        throw(error);
    }
}

async function getMasterDataByParent(parentCode) {
    try {
        let parentData = await MasterData.findOne({
            code: parentCode
        });

        let masterDatas = await MasterData.find({
            parent: parentData._id
        });
        return masterDatas;
    } catch (error) {
        throw(error);
    }
}

async function getMasterDataByParentAndCode(parentCode, dataCode) {
    try {
        let parentData = await MasterData.findOne({
            code: parentCode
        });

        let masterData = await MasterData.findOne({
            parent: parentData._id,
            code: dataCode
        });
        return masterData;
    } catch (error) {
        throw(error);
    }
}
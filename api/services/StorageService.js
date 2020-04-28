"use strict";
const storageModel = require('../models/StorageModel');

class StorageService extends require("./BaseService") {

    static getFreeIdByNotEmptyId(ids){
        storageModel
            .filterByIdNotIn(ids);
        return  storageModel
            .getSQL();
    }
}

module.exports = StorageService;
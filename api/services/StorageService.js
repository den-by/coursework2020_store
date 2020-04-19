"use strict";
const storageModel = require('../models/StorageModel');

class StorageService extends require("./BaseService") {

    static getNotId(){
        return  storageModel.getSQL();
    }
}

module.exports = StorageService;
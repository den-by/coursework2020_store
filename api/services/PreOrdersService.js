"use strict";
const preOrdersModel = require('../models/PreOrdersModel');

class PreOrdersService extends require("./BaseService") {

    static async getAll(){
        return preOrdersModel.getSQL();
    }

    static async getCount(){
        return preOrdersModel.setShowDefaultTable(false).selectCount().getSQL();
    }

    static async getSumTotalPrice(){
        return preOrdersModel.setShowDefaultTable(false).selectSumTotalPrice().getSQL();
    }

}

module.exports = PreOrdersService;
"use strict";
const preOrdersModel = require('../models/PreOrdersModel');

class PreOrdersService extends require("./BaseService") {

    static async getAll() {
        preOrdersModel
            .joinClients()
            .selectTable();
        return preOrdersModel
            .getSQL();
    }

    static async getCount() {
        const request = await preOrdersModel
            .setShowDefaultTable(false)
            .selectCount()
            .getSQL();
        return request[0];
    }

    static async getSumTotalPrice() {
        const request = await preOrdersModel
            .setShowDefaultTable(false)
            .selectSumTotalPrice()
            .getSQL();
        return request[0];
    }

}

module.exports = PreOrdersService;
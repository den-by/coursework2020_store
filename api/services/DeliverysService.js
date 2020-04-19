"use strict";
const deliverysModel = require('../models/DeliverysModel');

class DeliverysService extends require("./BaseService") {

    static getSymTotalPriceByDate(startDate, endDate) {
        return deliverysModel.setShowDefaultTable(false).selectSumCount().selectSumTotalPrice().filterByDateAdd(startDate, endDate).getSQL();
    }
}

module.exports = DeliverysService;
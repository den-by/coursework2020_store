"use strict";
const deliveryModel = require('../models/DeliveryModel');

class DeliveryService extends require("./BaseService") {

    static getSymTotalPriceByDate(startDate, endDate) {
        return deliveryModel.setShowDefaultTable(false).selectSumCount().selectSumTotalPrice().filterByDateAdd(startDate, endDate).getSQL();
    }
}

module.exports = DeliveryService;
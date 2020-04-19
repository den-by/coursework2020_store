"use strict";
const deliverysModel = require('../models/DeliverysModel');

class DeliverysService extends require("./BaseService") {

    static getSymTotalPriceByDate(startDate, endDate) {
        return deliverysModel.setShowDefaultTable(false).selectSumCount().selectSumTotalPrice().filterByDateAdd(startDate, endDate).getSQL();
    }

    static getInStorage(startDate, endDate) {
        deliverysModel.selectCountInStorage().filterByEndDateAdd(endDate).filterByStartDateAdd(startDate).filterByMinCount().joinLinksOrdersProducts();
        return deliverysModel.getSQL();
    }
}

module.exports = DeliverysService;
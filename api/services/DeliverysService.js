"use strict";
const deliverysModel = require('../models/DeliverysModel');

class DeliverysService extends require("./BaseService") {

    static getSymTotalPriceByDate(startDate, endDate) {
        return deliverysModel.setShowDefaultTable(false).selectSumCount().selectSumTotalPrice().filterByStartDateAdd(startDate).filterByEndDateAdd(endDate).getSQL();
    }

    static getInStorage(startDate, endDate) {
        deliverysModel.selectCountInStorage().filterByEndDateAdd(endDate).filterByStartDateAdd(startDate).filterByMinCount().joinLinksOrdersProducts();
        deliverysModel.joinStorage().selectTable();
        deliverysModel.joinProducts().selectTable();
        return deliverysModel.getSQL();
    }
}

module.exports = DeliverysService;
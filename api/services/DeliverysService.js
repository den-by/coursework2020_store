"use strict";
const deliverysModel = require('../models/DeliverysModel');

class DeliverysService extends require("./BaseService") {

    static getSymTotalPriceByDate(startDate, endDate) {
        return deliverysModel.setShowDefaultTable(false).selectSumCount().selectSumTotalPrice().filterByStartDateAdd(startDate).filterByEndDateAdd(endDate).getSQL();
    }

    static getInStorage(startDate, endDate, productId) {
        deliverysModel.filterByProductId(productId).selectCountInStorage().filterByStartDateAdd(startDate).filterByEndDateAdd(endDate).filterByMinCount().joinLinksOrdersProducts();
        deliverysModel.joinStorage().selectTable();
        deliverysModel.joinProducts().selectTable();
        return deliverysModel.getSQL();
    }
}

module.exports = DeliverysService;
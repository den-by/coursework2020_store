"use strict";
const clientsModel = require('../models/ClientsModel');

class SuppliersService extends require("./BaseService") {
    static async getClientAndAggregateCountByProductMinValueDate(productId, startDate, endDate, minCount) {
        clientsModel
            .groupById()
            .joinOrders()
            .filterByDate(startDate, endDate)
            .joinLinksOrdersProducts()
            .selectSumCount()
            .filterByMinSumCount(minCount)
            .joinDeliverys()
            .filterByProductId(productId);
        return clientsModel.getSQL();
    };
}

module.exports = SuppliersService;
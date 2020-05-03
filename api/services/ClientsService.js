"use strict";
const clientsModel = require('../models/ClientsModel');

class ClientsService extends require("./BaseService") {
    static async getClientAndAggregateCountByProductMinValueDate(productId, startDate, endDate, minCount) {
        clientsModel
            .groupById()
            .joinOrders()
            .filterByStartDateAdd(startDate)
            .filterByEndDateAdd(endDate)
            .joinLinksOrdersProducts()
            .selectSumCount()
            .filterByMinSumCount(minCount)
            .joinDeliverys()
            .filterByProductId(productId);
        return clientsModel
            .getSQL();
    };

    static async getAll() {
        return clientsModel
            .getSQL();
    }
}

module.exports = ClientsService;
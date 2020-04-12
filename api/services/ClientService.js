"use strict";
const clientsModel = require('../models/ClientsModel');

class SuppliersService extends require("./BaseService") {
    static async getClientAndAggregateCountByProductMinValueDate(productId, startDate, endDate, minCount) {
        clientsModel.groupById();
        const ordersModel = clientsModel.joinOrders();
        ordersModel.filterByDate(startDate, endDate);
        const linksOrdersProducts = ordersModel.joinLinksOrdersProducts();
        linksOrdersProducts.selectSumCount();
        linksOrdersProducts.filterByMinSumCount(minCount);
        linksOrdersProducts.filterByProductId(productId);
        return clientsModel.getSQL();
    };
}

module.exports = SuppliersService;
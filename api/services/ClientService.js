"use strict";
const clientsModel = require('../models/ClientsModel');

class SuppliersService extends require("./BaseService") {
    static async getClientAndAggregateCountByProductMinValueDate(productId, minDate, maxDate, minValue) {
        const ordersModel = clientsModel.joinOrders();
        const linksOrdersProducts = ordersModel.joinLinksOrdersProducts();
        linksOrdersProducts.filterByProductId(productId);
        return clientsModel.getSQL();
    };
}

module.exports = SuppliersService;
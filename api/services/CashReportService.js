"use strict";
const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');

class CashReportService extends require("./BaseService") {


    static async getCashReportByDate(startDate, endDate) {

        const productsModel = linksOrdersProductsModel.filterByDate(startDate,endDate).joinProducts();
        productsModel.getAllSelectedField();
        // deliveryModel.filterByDelivery(startDate, endDate);
        // deliveryModel.joinWriteoffs().selectAggregateCount();
        // deliveryModel.joinSuppliers().selectTable().groupById();

        return linksOrdersProductsModel.getSQL();
    };
}

module.exports = CashReportService;
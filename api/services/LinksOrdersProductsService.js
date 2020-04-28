"use strict";
const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');

class LinksOrdersProductsService extends require("./BaseService") {


    static async getCashReportByDate(startDate, endDate) {
        linksOrdersProductsModel
            .filterByStartDateAdd(startDate)
            .filterByEndDateAdd(endDate)
            .orderByDateAdd()
            .joinDeliverys()
            .joinProducts()
            .selectTable();
        return linksOrdersProductsModel
            .getSQL();
    };

    static async getSumCountAndTotalPrice(startDate, endDate) {
        linksOrdersProductsModel
            .setShowDefaultTable(false)
            .selectSumCount()
            .selectSumTotalPrice()
            .filterByEndDateAdd(startDate)
            .filterByEndDateAdd(endDate);
        return await linksOrdersProductsModel
            .getSQL();
    };

}

module.exports = LinksOrdersProductsService;
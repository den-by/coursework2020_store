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
    }

    static async getSumCountAndTotalPrice(startDate, endDate) {
        linksOrdersProductsModel
            .setShowDefaultTable(false)
            .selectSumCount()
            .selectSumTotalPrice()
            .filterByStartDateAdd(startDate)
            .filterByEndDateAdd(endDate);
        return await linksOrdersProductsModel
            .getSQL();
    }

    static async getSumTotalPrice(startDate, endDate) {
        const request = await linksOrdersProductsModel
            .filterByStartDateAdd(startDate)
            .filterByEndDateAdd(endDate)
            .setShowDefaultTable(false)
            .selectSumTotalPrice()
            .getSQL();
        return request[0];
    }

    static async getSumCount(startDate, endDate) {
        const request = await linksOrdersProductsModel
            .filterByStartDateAdd(startDate)
            .filterByEndDateAdd(endDate)
            .setShowDefaultTable(false)
            .selectSumCount()
            .getSQL();
        return request[0];
    }
}

module.exports = LinksOrdersProductsService;
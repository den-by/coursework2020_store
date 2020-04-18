"use strict";
const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');

class LinksOrdersProductsService extends require("./BaseService") {


    static async getCashReportByDate(startDate, endDate) {

        const productsModel = linksOrdersProductsModel.filterByDate(startDate,endDate).orderByDateAdd().joinProducts();
        productsModel.getAllSelectedField();

        return linksOrdersProductsModel.getSQL();
    };

    static async getSumCountAndTotalPrice(startDate, endDate) {
        linksOrdersProductsModel.setShowDefaultTable(false).selectSumCount().selectSumTotalPrice().filterByDate(startDate, endDate);
        return await linksOrdersProductsModel.getSQL();
    };

}

module.exports = LinksOrdersProductsService;
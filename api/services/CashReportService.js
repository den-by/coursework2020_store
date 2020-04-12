"use strict";
const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');

class CashReportService extends require("./BaseService") {


    static async getCashReportByDate(startDate, endDate) {

        const productsModel = linksOrdersProductsModel.filterByDate(startDate,endDate).orderByDateAdd().joinProducts();
        productsModel.getAllSelectedField();

        return linksOrdersProductsModel.getSQL();
    };
}

module.exports = CashReportService;
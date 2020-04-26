"use strict";
const productsModel = require('../models/ProductsModel');

class ProductsService extends require("./BaseService") {


    static async getDefectedDeliveryByProducts(startDate, endDate) {

        const deliveryModel = productsModel.groupById().joinDelivery();
        deliveryModel.filterByDateAdd(startDate, endDate);
        deliveryModel.joinWriteoffs().selectAggregateCount();
        deliveryModel.joinSuppliers().selectTable().groupById();

        return productsModel.getSQL();
    };


    static async getTopProducts() {
        const deliveryModel = productsModel.limit(10).groupById().joinDelivery();
        deliveryModel.joinLinksOrdersProducts().selectSumCount().orderBySumCount();

        return productsModel.getSQL();
    };

    static async getProductsAndAverageSale(numberOfMonthsPassed  = 3) {
        productsModel.groupById();
        productsModel.joinDelivery().joinLinksOrdersProducts().filterByNumberOfMonthsPassed(numberOfMonthsPassed).selectAverageCountBYMonth(numberOfMonthsPassed).selectAverageTotalPriceByMonth(numberOfMonthsPassed);

        return productsModel.getSQL();
    };

    static async getSelProductsByDay(startDate) {
        productsModel.groupById();
        productsModel.joinDelivery().joinLinksOrdersProducts().filterByDay(startDate).selectSumCount().selectSumTotalPrice();

        return productsModel.getSQL();
    };
}

module.exports = ProductsService;
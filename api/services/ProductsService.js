"use strict";
const productsModel = require('../models/ProductsModel');

class ProductsService extends require("./BaseService") {


    static async getDefectedDeliveryByProducts(startDate, endDate) {

        const deliveryModel = productsModel
            .groupById()
            .joinDelivery()
            .filterByStartDateAdd(startDate)
            .filterByEndDateAdd(endDate);
        deliveryModel
            .joinWriteoffs()
            .selectAggregateCount();
        deliveryModel
            .joinSuppliers()
            .selectTable()
            .groupById();

        return productsModel
            .getSQL();
    };


    static async getTopProducts() {
        productsModel
            .limit(10)
            .groupById()
            .joinDelivery()
            .joinLinksOrdersProducts()
            .selectSumCount()
            .orderBySumCount();
        return productsModel
            .getSQL();
    };

    static async getProductsAndAverageSale(numberOfMonthsPassed = 3) {
        productsModel
            .groupById()
            .joinDelivery()
            .joinLinksOrdersProducts()
            .filterByNumberOfMonthsPassed(numberOfMonthsPassed)
            .selectAverageCountBYMonth(numberOfMonthsPassed)
            .selectAverageTotalPriceByMonth(numberOfMonthsPassed);
        return productsModel
            .getSQL();
    };

    static async getSelProductsByDay(startDate) {
        productsModel
            .groupById()
            .joinDelivery()
            .joinLinksOrdersProducts()
            .filterByDay(startDate)
            .selectSumCount()
            .selectSumTotalPrice();
        return productsModel
            .getSQL();
    };

    static async getAll() {
        return productsModel
            .getSQL();
    };
}

module.exports = ProductsService;
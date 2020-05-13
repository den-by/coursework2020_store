"use strict";
const suppliersModel = require('../models/SuppliersModel');

class SuppliersService extends require("./BaseService") {

    static getByTypeIdProductIdDelivery(supplierTypeId, productId, startData, endData, minValue, deliveryProductId) {
        suppliersModel
            .filterBySupplierType(supplierTypeId)
            .joinLinkProductsSuppliers()
            .filterByProductId(productId);
        suppliersModel
            .joinDelivery()
            .filterByMinSumCount(minValue)
            .selectSumCount()
            .filterByStartDateAdd(startData)
            .filterByEndDateAdd(endData)
            .filterByProductId(deliveryProductId);
        suppliersModel
            .joinSupplierType()
            .selectTable();
        return suppliersModel
            .getSQL();
    };

    static async getSuppliersProductsDeliveryTimeByProduct(productId) {
        suppliersModel
            .joinLinkProductsSuppliers()
            .selectTable()
            .filterByProductId(productId)
            .joinProducts()
            .selectTable();
        return suppliersModel
            .getSQL();
    };

    static async getTopSuppliersByProduct(productId) {
        suppliersModel.limit(10)
            .joinLinkProductsSuppliers()
            .filterByProductId(productId)
            .orderByPrice()
            .selectTable()
            .joinProducts()
            .selectTable();
        return suppliersModel
            .getSQL();
    };

    static async getSuppliersAndProfit(startDate, endDate, sum_count, sum_total_price) {
        suppliersModel
            .groupById()
            .joinDelivery()
            .joinLinksOrdersProducts()
            .filterByStartDateAdd(startDate)
            .filterByEndDateAdd(endDate)
            .selectSumCount()
            .selectSumTotalPrice()
            .selectPercentSumTotalPrice(sum_total_price)
            .selectPercentSumCount(sum_count);
        return suppliersModel
            .getSQL();
    };

}

module.exports = SuppliersService;
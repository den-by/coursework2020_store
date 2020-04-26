"use strict";
const suppliersModel = require('../models/SuppliersModel');

class SuppliersService extends require("./BaseService") {

    static getByTypeIdProductIdDelivery(supplierTypeId, productId, startData, endData, minValue, deliveryProductId) {
        suppliersModel.filterBySupplierType(supplierTypeId).joinLinkProductsSuppliers().filterByProductId(productId);
        suppliersModel.joinDelivery().filterByMinSumCount(minValue).selectSumCount().filterByStartDateAdd(startData).filterByEndDateAdd(endData).filterByProductId(deliveryProductId);
        suppliersModel.joinSupplierType().selectTable();
        return suppliersModel.getSQL();
    };

    static async getSuppliersAndDeliveryTimeByProduct(productId) {
        suppliersModel.joinLinkProductsSuppliers().filterByProductId(productId);
        suppliersModel.selectPriceDeliveryTime();
        return suppliersModel.getSQL();
    };

    static async getTopSuppliersByProduct(productId) {
        suppliersModel.limit(10).joinLinkProductsSuppliers().filterByProductId(productId).orderByPrice().selectTable();
        return suppliersModel.getSQL();
    };

    static async getSuppliersAndProfit(startDate, endDate, sum_count, sum_total_price) {
        suppliersModel.groupById().joinDelivery().joinLinksOrdersProductsByStartDateAndEndDate(startDate, endDate).
        selectSumCount().selectSumTotalPrice().
        selectPercentSumTotalPrice(sum_total_price).selectPercentSumCount(sum_count);
        return suppliersModel.getSQL();
    };

}

module.exports = SuppliersService;
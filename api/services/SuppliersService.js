"use strict";
const suppliersModel = require('../models/SuppliersModel');

class SuppliersService extends require("./BaseService") {

    static getByTypeIdProductIdDelivery(supplier_type_id, product_id, startData, endData, minValue, productId) {
        suppliersModel.filterBySupplierType(supplier_type_id).joinLinkProductsSuppliers().filterByProductId(product_id);
        suppliersModel.filterByMinCount(minValue).joinDelivery().filterByDelivery(startData, endData, productId);
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

    static async getSuppliersAndProfit(startDate, endDate) {
        suppliersModel.groupById().joinDelivery().joinLinksOrdersProductsByStartDateAndEndDate(startDate, endDate).
        selectSumCount().selectSumTotalPrice().
        selectPercentSumTotalPrice().selectPercentSumCount();
        return suppliersModel.getSQL();
    };

}

module.exports = SuppliersService;
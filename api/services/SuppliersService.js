"use strict";
const suppliersModel = require('../models/SuppliersModel');

class SuppliersService extends require("./BaseService") {

    static getByTypeIdProductIdDelivery(supplier_type_id, product_id, startData, endData, minValue, productId) {
        suppliersModel.filterBySupplierType(supplier_type_id).joinLinkProductsSuppliers().filterByProductId(product_id);
        suppliersModel.filterByMinCount(minValue).joinDelivery().filterByDateAdd(startData, endData).filterByProductId(productId);
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

    // static async getSumCountAndTotalPrice(startDate, endDate) {
    //     const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');
    //      linksOrdersProductsModel.setShowDefaultTable(false).selectCount().selectSumTotalPrice().filterByDate(startDate, endDate);
    //     return await linksOrdersProductsModel.getSQL();
    // };

    static async getSuppliersAndProfit(startDate, endDate, sum_count, sum_total_price) {
        // const {sum_count: sum_count ,sum_total_price : sum_total_price} = res[0];
        suppliersModel.groupById().joinDelivery().joinLinksOrdersProductsByStartDateAndEndDate(startDate, endDate).
        selectSumCount().selectSumTotalPrice().
        selectPercentSumTotalPrice(sum_total_price).selectPercentSumCount(sum_count);
        return suppliersModel.getSQL();
    };

}

module.exports = SuppliersService;
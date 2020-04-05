"use strict";
const suppliersModel = require('../models/SuppliersModel');

class SuppliersService extends require("./BaseService") {

    static getByTypeIdProductIdDelivery(supplier_type_id, product_id, startData, endData, minValue, productId) {
        suppliersModel.filterBySupplierType(supplier_type_id).joinLinkProductsSuppliers().filterByProductId(product_id);
        suppliersModel.filterByMinCount(minValue).joinDelivery().filterByDelivery(startData, endData, productId);
        return suppliersModel.getSQL();
    };

    static async getSuppliersAndDeliveryTimeByProduct(productId) {
        suppliersModel.selectPriceDeliveryTime().joinLinkProductsSuppliers().filterByProductId(productId);
        return suppliersModel.getSQL();

    };

}

module.exports = SuppliersService;
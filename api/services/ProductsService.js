"use strict";
const ProductsModel = require('../models/ProductsModel');

class SuppliersService extends require("./BaseService") {


    static async getDefectedDeliveryByProducts(startDate, endDate) {

        const deliveryModel = ProductsModel.groupByIdAndSupplierId().joinDelivery();
        deliveryModel.filterByDelivery(startDate, endDate);
        const WriteoffsModel = deliveryModel.joinWriteoffs().selectAggregateCount();
        const SuppliersModel = deliveryModel.joinSuppliers().selectTable();

        return ProductsModel.getSQL();
    };

    static async getTopProducts() {

        ProductsModel.limit(10);
        return ProductsModel.getSQL();
    };

}

module.exports = SuppliersService;
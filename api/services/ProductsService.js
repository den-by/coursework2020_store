"use strict";
const ProductsModel = require('../models/ProductsModel');

class SuppliersService extends require("./BaseService") {


    static async getDefectedDeliveryByProducts(startDate, endDate) {

        const deliveryModel = ProductsModel.groupById().joinDelivery();
        deliveryModel.filterByDelivery(startDate, endDate);
        const WriteoffsModel = deliveryModel.joinWriteoffs().selectAggregateCount();
        const SuppliersModel = deliveryModel.joinSuppliers().selectTable().groupById();

        return ProductsModel.getSQL();
    };

    static async getTopProducts() {
        const deliveryModel = ProductsModel.limit(10).groupById().joinDelivery();
        const linksOrdersProducts = deliveryModel.joinLinksOrdersProducts().selectAggregateCount().orderByAggregateCount();
        return ProductsModel.getSQL();
    };

}

module.exports = SuppliersService;
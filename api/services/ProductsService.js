"use strict";
const ProductsModel = require('../models/ProductsModel');

class SuppliersService extends require("./BaseService") {


    static async getDefectedDeliveryByProducts(startDate, endDate) {

        const deliveryModel = ProductsModel.groupByIdAndSupplierId().joinDelivery();
        deliveryModel.filterByDelivery(startDate, endDate);
        const WriteoffsModel = deliveryModel.joinWriteoffs().selectAggregateCount();
        const SuppliersModel = deliveryModel.joinSuppliers().addToSelectThis();

        return ProductsModel.getSQL();
//https://sqlinfo.ru/articles/info/39.html
    };

}

module.exports = SuppliersService;
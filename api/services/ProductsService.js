"use strict";
// const suppliersModel = require('../models/SuppliersModel');
const ProductsModel = require('../models/ProductsModel');

class SuppliersService extends require("./BaseService") {


    static async getDefectedDeliveryByProducts(startDate, endDate) {

        const deliveryModel = ProductsModel.groupByIdAndSupplierId().joinDelivery();
        deliveryModel.filterByDelivery(startDate, endDate);
        deliveryModel.selectAggregateCount();
        const WriteoffsModel = deliveryModel.joinWriteoffs();
        const SuppliersModel = deliveryModel.joinSuppliers();

        // let products = delivery.joinProducts().joinWriteoffs();
        // suppliersModel.selectPriceDeliveryTime();
        return ProductsModel.getSQL();
//https://sqlinfo.ru/articles/info/39.html
    };

}

module.exports = SuppliersService;
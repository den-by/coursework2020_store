"use strict";
// const suppliersModel = require('../models/SuppliersModel');
const ProductsModel = require('../models/ProductsModel');

class SuppliersService extends require("./BaseService") {


    static async getDefectedDeliveryByProducts(startDate, endDate) {

        // let delivery = suppliersModel.joinDelivery();
        // let products = delivery.joinProducts().joinWriteoffs();


        // suppliersModel.selectPriceDeliveryTime();
        return ProductsModel.getSQL();
//https://sqlinfo.ru/articles/info/39.html
    };

}

module.exports = SuppliersService;
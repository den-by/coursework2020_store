"use strict";
const suppliersModel = require('../models/SuppliersModel');

class SuppliersService extends require("./BaseService") {


    static async getDefectedDeliveryByProducts(startDate, endDate) {
        let delivery = suppliersModel.joinDelivery();
        let products = delivery.joinProducts().joinWriteoffs();


        // suppliersModel.selectPriceDeliveryTime();
        return suppliersModel.getSQL();

    };

}

module.exports = SuppliersService;
"use strict";
const TABLE_NAME = "products";
const ID = 'id';
const PRODUCT_DESCRIPTION = "description";
const SELLING_PRICE = 'selling_price';
const NAME = 'name';
const FIELDS = [
    ID, PRODUCT_DESCRIPTION, SELLING_PRICE, NAME
];

class ProductsModel extends require("./BaseModel") {

    static get ID() {
        return ID;
    }

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static joinDelivery = () => {
        const DeliveryModel = require('../models/DeliveryModel');
        this.data.join.push(`JOIN ${DeliveryModel.TABLE_NAME} on ${TABLE_NAME}.${ID} = ${DeliveryModel.TABLE_NAME}.${DeliveryModel.PRODUCT_ID}`);
        DeliveryModel.syncData(this.data);
        return DeliveryModel;
    };

    static groupByIdAndSupplierId(){
        const SuppliersModel = require('../models/SuppliersModel');
        this.data.groupBy.push(`${TABLE_NAME}.${ID}, ${SuppliersModel.TABLE_NAME}.${SuppliersModel.ID}`);
        return this
    }
}

module.exports = ProductsModel;
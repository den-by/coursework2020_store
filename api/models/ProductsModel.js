"use strict";
const TABLE_NAME = "products";
const ID = 'id';
const PRICE = 'price';
const NAME = 'name';
const FIELDS = [
    ID, PRICE, NAME
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

    static joinDelivery() {
        const deliveryModel = require('./DeliverysModel');
        this.data.join.push(`LEFT JOIN ${deliveryModel.TABLE_NAME} on ${TABLE_NAME}.${ID} = ${deliveryModel.TABLE_NAME}.${deliveryModel.PRODUCT_ID}`);
        deliveryModel.syncData(this.data);
        return deliveryModel;
    }

    static groupById() {
        this.data.groupBy.push(`${TABLE_NAME}.${ID}`);
        return this;
    }
}

module.exports = ProductsModel;
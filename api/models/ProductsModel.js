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

    static joinDelivery() {
        const deliveryModel = require('./DeliverysModel');
        this.data.join.push(`LEFT JOIN ${deliveryModel.TABLE_NAME} on ${TABLE_NAME}.${ID} = ${deliveryModel.TABLE_NAME}.${deliveryModel.PRODUCT_ID}`);
        deliveryModel.syncData(this.data);
        return deliveryModel;
    }

    // static joinLinksOrdersProducts() {
    //     const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');
    //     this.data.join.push(`LEFT JOIN ${linksOrdersProductsModel.TABLE_NAME} on ${TABLE_NAME}.${ID} = ${linksOrdersProductsModel.TABLE_NAME}.${linksOrdersProductsModel.DELIVERY_ID}`);
    //     linksOrdersProductsModel.syncData(this.data);
    //     return linksOrdersProductsModel;
    // }

    static groupById(){
        this.data.groupBy.push(`${TABLE_NAME}.${ID}`);
        return this;
    }
}

module.exports = ProductsModel;
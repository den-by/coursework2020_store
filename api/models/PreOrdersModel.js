"use strict";
const TABLE_NAME = "pre_orders";
const ID = 'id';
const PRODUCT_NAME = "product_name";
const SELLING_PRICE = 'price';
const COUNT = 'count';
const TOTAL_COUNT = 'total_count';
const TOTAL_PRICE = 'total_price';
const PRE_ORDERS_COUNT = 'pre_orders_count';
const SUM_TOTAL_PRICE = 'sum_total_price';
const FIELDS = [
    ID, PRODUCT_NAME, SELLING_PRICE, COUNT, TOTAL_PRICE
];

class PreOrdersModel extends require("./BaseModel") {

    static get ID() {
        return ID;
    }

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static selectCount() {
        this.data.select.push(`count(${TABLE_NAME}.${ID}) as ${PRE_ORDERS_COUNT}`);
        return this;
    }

    static selectSumTotalPrice() {
        this.data.select.push(`sum(${TABLE_NAME}.${TOTAL_PRICE}) as ${SUM_TOTAL_PRICE}`);
        return this;
    }


    // static joinDelivery() {
    //     const deliveryModel = require('./DeliverysModel');
    //     this.data.join.push(`LEFT JOIN ${deliveryModel.TABLE_NAME} on ${TABLE_NAME}.${ID} = ${deliveryModel.TABLE_NAME}.${deliveryModel.PRODUCT_ID}`);
    //     deliveryModel.syncData(this.data);
    //     return deliveryModel;
    // }
    //
    // static joinLinksOrdersProducts() {
    //     const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');
    //     this.data.join.push(`LEFT JOIN ${linksOrdersProductsModel.TABLE_NAME} on ${TABLE_NAME}.${ID} = ${linksOrdersProductsModel.TABLE_NAME}.${linksOrdersProductsModel.PRODUCT_ID}`);
    //     linksOrdersProductsModel.syncData(this.data);
    //     return linksOrdersProductsModel;
    // }

    // static groupById(){
    //     this.data.groupBy.push(`${TABLE_NAME}.${ID}`);
    //     return this;
    // }
}

module.exports = PreOrdersModel;
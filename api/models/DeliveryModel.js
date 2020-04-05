"use strict";
const ProductsModel = require('../models/ProductsModel');
const SuppliersModel = require('../models/SuppliersModel');
const ID = 'id';
const TABLE_NAME = 'deliverys';
const DATE_ADD = 'date_add';
const MIN_VALUE = 'min_value';
const PRODUCT_ID = 'product_id';
const PURCHASE_PRICE = 'purchase_price';
const DELIVERY_HOUR = 'delivery_hour';
const SUPPLIER_ID = 'supplier_id';
const FIELDS = [
    ID, PRODUCT_ID, DATE_ADD, MIN_VALUE, PURCHASE_PRICE, DELIVERY_HOUR
];
const START_DATE = 'start_date';
const END_DATE = 'end_date';

class DeliveryModel extends require("./BaseModel") {

    static get START_DATE() {
        return START_DATE;
    }

    static get END_DATE() {
        return END_DATE;
    }

    static get DATE_ADD() {
        return END_DATE;
    }

    static get MIN_VALUE() {
        return END_DATE;
    }

    static get PRODUCT_ID() {
        return END_DATE;
    }

    static get SUPPLIER_ID() {
        return SUPPLIER_ID;
    }

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static filterByDelivery(startData, endData, productId) {
        if(productId) {
            this.data.where.push(`${TABLE_NAME}.${PRODUCT_ID} = ${productId}`);
        }
        if (startData && endData) {
            const parseStartDate = Date.parse(startData);
            const parseEndDate = Date.parse(endData);
            if (parseStartDate && parseEndDate) {
                this.data.where.push(`${TABLE_NAME}.${DATE_ADD} > ${startData}`);
                this.data.where.push(`${TABLE_NAME}.${DATE_ADD} < ${endData}`);
            }
        }
        return this;
    }

    static joinProducts = () => {
        this.data.join.push(`JOIN ${ProductsModel.TABLE_NAME} on ${ProductsModel.TABLE_NAME}.${ProductsModel.ID} = ${TABLE_NAME}.${PRODUCT_ID}`);
        ProductsModel.syncData(this.data);
        return ProductsModel;
    };
}

module.exports = DeliveryModel;
"use strict";
const TABLE_NAME = "products";
const ID = 'id';
const PRODUCT_ID = "id";
const PRODUCT_DESCRIPTION = "description";
const SELLING_PRICE = 'selling_prise';
const FIELDS = [
    ID, PRODUCT_ID, PRODUCT_DESCRIPTION, SELLING_PRICE
];
const WriteoffsModel = require('../models/WriteoffsModel');

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

    static joinWriteoffs = () => {
        this.data.join.push(`JOIN ${WriteoffsModel.TABLE_NAME} on ${WriteoffsModel.TABLE_NAME}.${WriteoffsModel.PRODUCT_ID} = ${TABLE_NAME}.${ID}`);
        WriteoffsModel.syncData(this.data)
        return WriteoffsModel;
    }
}

module.exports = ProductsModel;
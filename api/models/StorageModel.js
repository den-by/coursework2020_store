"use strict";
const TABLE_NAME = "storage";
const ID = 'id';
const NAME = "name";
// const PRODUCT_DESCRIPTION = "product_description";
// const SELLING_PRICE = 'selling_prise';
const COUNT = 'count';
const FIELDS = [
    ID, NAME
];

class StorageModel extends require("./BaseModel") {

    static get ID() {
        return ID;
    }

    // static get PRODUCT_ID() {
    //     return PRODUCT_ID;
    // }

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static selectAggregateCount = () => {
        this.data.select.push(`sum(${TABLE_NAME}.${COUNT}) as sum_count`);
        return this;
    };
}

module.exports = StorageModel;
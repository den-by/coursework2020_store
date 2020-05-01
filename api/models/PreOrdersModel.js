"use strict";
const TABLE_NAME = "pre_orders";
const ID = 'id';
const PRODUCT_NAME = "product_name";
const PRICE = 'price';
const COUNT = 'count';
const CLIENT_ID = 'client_id';
const TOTAL_PRICE = 'total_price';
const PRE_ORDERS_COUNT = 'pre_orders_count';
const DATE_ADD = 'date_add';
const SUM_TOTAL_PRICE = 'sum_total_price';
const FIELDS = [
    ID, PRODUCT_NAME, PRICE, COUNT, TOTAL_PRICE, DATE_ADD
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


    static joinClients() {
        const clientsModel = require('./ClientsModel');
        this.data.join.push(`LEFT JOIN ${clientsModel.TABLE_NAME} on ${TABLE_NAME}.${CLIENT_ID} = ${clientsModel.TABLE_NAME}.${clientsModel.ID}`);
        clientsModel.syncData(this.data);
        return clientsModel;
    }
}

module.exports = PreOrdersModel;
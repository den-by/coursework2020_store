"use strict";
const TABLE_NAME = "clients";

const ID = 'id';
const NAME = 'name';
const FIELDS = [
    ID, NAME
];

class ClientsModel extends require("./BaseModel") {

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static get ID() {
        return ID;
    }

    static joinOrders() {
        const OrdersModel = require('../models/OrdersModel');
        this.data.join.push(`LEFT JOIN ${OrdersModel.TABLE_NAME} on ${OrdersModel.TABLE_NAME}.${OrdersModel.CLIENT_ID} = ${TABLE_NAME}.${ID}`);
        OrdersModel.syncData(this.data);
        return OrdersModel
    }
}

module.exports = ClientsModel;
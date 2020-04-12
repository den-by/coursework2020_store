"use strict";
const TABLE_NAME = "orders";

const ID = 'id';
const NAME = 'name';
const CLIENT_ID = "client_id";
const FIELDS = [
    ID, CLIENT_ID, NAME
];

class ClientsModel extends require("./BaseModel") {

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static get CLIENT_ID() {
        return CLIENT_ID;
    }

    static get ID() {
        return ID;
    }

    static joinLinksOrdersProducts() {
        const LinksOrdersProductsModel = require('../models/LinksOrdersProductsModel');
        this.data.join.push(`LEFT JOIN ${LinksOrdersProductsModel.TABLE_NAME} on ${LinksOrdersProductsModel.TABLE_NAME}.${LinksOrdersProductsModel.ORDERS_ID} = ${TABLE_NAME}.${ID}`);
        LinksOrdersProductsModel.syncData(this.data);
        return LinksOrdersProductsModel
    }
}

module.exports = ClientsModel;
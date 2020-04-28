"use strict";
const TABLE_NAME = "links_products_suppliers";
const ID = 'id';
const SUPPLIER_ID = "supplier_id";
const PRODUCT_ID = "product_id";
const PRICE = 'price';
const DELIVERY_HOUR = 'delivery_hour';
const FIELDS = [
    ID, SUPPLIER_ID, PRODUCT_ID, PRICE, DELIVERY_HOUR
];

class LinksProductsSuppliersModel extends require("./BaseModel") {

    static get SUPPLIER_ID() {
        return SUPPLIER_ID;
    }

    static get PRODUCT_ID() {
        return PRODUCT_ID;
    }

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static filterByProductId(product_id) {
        if (product_id) {
            this.data.where.push(`${TABLE_NAME}.${PRODUCT_ID} = ${product_id}`);
        }
        return this;
    }

    static joinProducts() {
        const productsModel = require('../models/ProductsModel');
        this.data.join.push(`LEFT JOIN ${productsModel.TABLE_NAME} on ${productsModel.TABLE_NAME}.${productsModel.ID} = ${TABLE_NAME}.${PRODUCT_ID}`);
        productsModel.syncData(this.data);
        return productsModel
    }

    static orderByPrice() {
        this.data.orderBy.push(`${TABLE_NAME}.${PRICE} ASC`);
        return this;
    }

}

module.exports = LinksProductsSuppliersModel;
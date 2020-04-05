"use strict";
const TABLE_NAME = "links_products_suppliers";
const ID = 'id';
const SUPPLIER_ID = "supplier_id";
const PRODUCT_ID = "product_id";
const PURCHASE_PRICE = 'purchase_price';
const DELIVERY_HOUR = 'delivery_hour';
const FIELDS = [
    ID, SUPPLIER_ID, PRODUCT_ID, PURCHASE_PRICE, DELIVERY_HOUR
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

    static orderByPrice() {
        this.data.orderBy.push(`${TABLE_NAME}.${PURCHASE_PRICE} ASC`);
        return this;
    }

}

module.exports = LinksProductsSuppliersModel;
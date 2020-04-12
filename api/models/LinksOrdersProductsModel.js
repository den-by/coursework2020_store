"use strict";
const TABLE_NAME = "links_orders_products";
const ID = 'id';
const PRODUCT_ID = "product_id";
const ORDERS_ID = "order_id";
const PRICE = 'price';
const COUNT = 'count';
const DELIVERY_HOUR = 'delivery_hour';
const AGGREGATE_COUNT = 'AggregateCount';
const FIELDS = [
    ID, ORDERS_ID, PRODUCT_ID, PRICE, DELIVERY_HOUR, COUNT
];

class LinksOrdersProductsModel extends require("./BaseModel") {

    static get ORDERS_ID() {
        return ORDERS_ID;
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

    static get COUNT() {
        return COUNT;
    }

    static selectAggregateCount = () => {
        this.data.select.push(`sum(${TABLE_NAME}.${COUNT}) as ${AGGREGATE_COUNT}`);
        return this;
    };

    static orderByAggregateCount = () => {
        this.data.orderBy.push(`${AGGREGATE_COUNT} desc`);
        return this;
    };


    static filterByProductId(product_id) {
        if (product_id) {
            this.data.where.push(`${TABLE_NAME}.${PRODUCT_ID} = ${product_id}`);
        }
        return this;
    }
    //
    // static orderByPrice() {
    //     this.data.orderBy.push(`${TABLE_NAME}.${PURCHASE_PRICE} ASC`);
    //     return this;
    // }

}

module.exports = LinksOrdersProductsModel;
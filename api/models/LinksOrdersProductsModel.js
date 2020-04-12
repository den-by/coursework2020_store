"use strict";
const TABLE_NAME = "links_orders_products";
const ID = 'id';
const PRODUCT_ID = "product_id";
const ORDERS_ID = "order_id";
const PRICE = 'price';
const COUNT = 'count';
const DELIVERY_HOUR = 'delivery_hour';
const SUM_COUNT = 'sum_count';
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

    static selectSumCount() {
        this.data.select.push(`sum(${TABLE_NAME}.${COUNT}) as ${SUM_COUNT}`);
        return this;
    };

    static orderByAggregateCount() {
        this.data.orderBy.push(`${SUM_COUNT} desc`);
        return this;
    };


    static filterByProductId(productId) {
        if (productId) {
            this.data.where.push(`${TABLE_NAME}.${PRODUCT_ID} = ${productId}`);
        }
        return this;
    }

    static filterByMinSumCount(minCount) {
        if (minCount) {
             this.data.having.push(`sum(${TABLE_NAME}.${COUNT}) > ${minCount}`);
        }
        return this;
    }
}

module.exports = LinksOrdersProductsModel;
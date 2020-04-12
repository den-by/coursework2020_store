"use strict";
const TABLE_NAME = "links_orders_products";
const ID = 'id';
const PRODUCT_ID = "product_id";
const ORDERS_ID = "order_id";
const PRICE = 'price';
const TOTAL_PRICE = 'total_price';
const DATE_ADD = 'date_add';
const COUNT = 'count';
const DELIVERY_HOUR = 'delivery_hour';
const AVERAGE_COUNT_BY_MONTH = 'average_count_by_month';
const SUM_COUNT = 'sum_count';
const SUM_TOTAL_PRICE = 'sum_total_price';
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
    }

    static selectSumTotalPrice() {
        this.data.select.push(`sum(${TABLE_NAME}.${TOTAL_PRICE}) as ${SUM_TOTAL_PRICE}`);
        return this;
    }

    static selectAverageCountBYMonth(monthLeft = 3) {
        this.data.select.push(`ROUND( sum(${TABLE_NAME}.${COUNT}) / ${monthLeft}, 0) as ${AVERAGE_COUNT_BY_MONTH}`);
        return this;
    }

    static orderBySumCount() {
        this.data.orderBy.push(`${SUM_COUNT} desc`);
        return this;
    }


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

    static filterByDay(startDate) {
        if (startDate) {
            this.data.where.push(`${TABLE_NAME}.${DATE_ADD} > ${startDate}`);
            this.data.where.push(`${TABLE_NAME}.${DATE_ADD} < ${startDate} + INTERVAL 1 DAY`);
        }
        return this;
    }
}

module.exports = LinksOrdersProductsModel;
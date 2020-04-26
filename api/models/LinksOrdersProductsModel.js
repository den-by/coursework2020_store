"use strict";
const TABLE_NAME = "links_orders_products";
const ID = 'id';
const PRODUCT_ID = "product_id";
const DELIVERY_ID = "delivery_id";
const ORDER_ID = "order_id";
const PRICE = 'price';
const TOTAL_PRICE = 'total_price';
const PERCENT_TOTAL_PRICE = 'percent_total_price';
const PERCENT_COUNT = 'percent_count';
const DATE_ADD = 'date_add';
const COUNT = 'count';
const AVERAGE_COUNT_BY_MONTH = 'average_count_by_month';
const AVERAGE_TOTAL_PRICE_BY_MONTH = 'average_total_price_by_month';
const SUM_COUNT = 'sum_count';
const SUM_TOTAL_PRICE = 'sum_total_price';
const FIELDS = [
    ID, ORDER_ID, PRICE, COUNT, DATE_ADD
];

class LinksOrdersProductsModel extends require("./BaseModel") {

    static get ORDER_ID() {
        return ORDER_ID;
    }

    static get PRODUCT_ID() {
        return PRODUCT_ID;
    }

    static get DELIVERY_ID() {
        return DELIVERY_ID;
    }

    static get DATE_ADD() {
        return DATE_ADD;
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

    static selectPercentSumTotalPrice(sum){
        // this.data.select.push(`ROUND(sum(${TABLE_NAME}.${TOTAL_PRICE}) / (select sum(${TABLE_NAME}.${TOTAL_PRICE}) from ${TABLE_NAME} where  ${startDate?startDate+' < '+DATE_ADD:''} and ${DATE_ADD} < ${endDate}) * 100,2) as  ${PERCENT_TOTAL_PRICE}`);
        this.data.select.push(`ROUND(sum(${TABLE_NAME}.${TOTAL_PRICE} / ${sum}) * 100,2) as  ${PERCENT_TOTAL_PRICE}`);
        // this.data.select.push(`ROUND( (select sum(tab1.${TOTAL_PRICE}) from ${TABLE_NAME} as tab1 join ${TABLE_NAME} as tab2 on tab2.id = tab1.id),2) as  ${PERCENT_TOTAL_PRICE}`);
        return this;
    }

    static selectPercentSumCount(sum){
        this.data.select.push(`ROUND(sum(${TABLE_NAME}.${COUNT}) / ${sum} * 100,2) as  ${PERCENT_COUNT}`);
        // this.data.select.push(`ROUND(sum(${TABLE_NAME}.${COUNT}) / (select sum(${TABLE_NAME}.${COUNT}) from ${TABLE_NAME} ) * 100,2) as  ${PERCENT_COUNT}`);
        return this;
    }

    static selectAverageCountBYMonth(numberOfMonthsPassed) {
        this.data.select.push(`ROUND( sum(${TABLE_NAME}.${COUNT}) / ${numberOfMonthsPassed}, 0) as ${AVERAGE_COUNT_BY_MONTH}`);
        return this;
    }


    static selectAverageTotalPriceByMonth(numberOfMonthsPassed) {
        this.data.select.push(`ROUND( sum(${TABLE_NAME}.${TOTAL_PRICE}) / ${numberOfMonthsPassed}, 0) as ${AVERAGE_TOTAL_PRICE_BY_MONTH}`);
        return this;
    }

    static filterByNumberOfMonthsPassed(numberOfMonthsPassed) {
        this.data.where.push(`${TABLE_NAME}.${DATE_ADD} > NOW() - INTERVAL ${numberOfMonthsPassed} MONTH`);
        return this;
    }

    static orderBySumCount() {
        this.data.orderBy.push(`${SUM_COUNT} desc`);
        return this;
    }

    static orderByDateAdd() {
        this.data.orderBy.push(`${TABLE_NAME}.${DATE_ADD} asc`);
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

    static filterByDate(startDate, endDate) {
        if (startDate) {
            this.data.where.push(`${TABLE_NAME}.${DATE_ADD} > ${startDate}`);
        }
        if (endDate) {
            this.data.where.push(`${TABLE_NAME}.${DATE_ADD} < ${endDate}`);
        }
        return this;
    }

    static joinOrders() {
        const ordersModel = require('../models/OrdersModel');
        this.data.join.push(`LEFT JOIN ${ordersModel.TABLE_NAME} on ${ordersModel.TABLE_NAME}.${ordersModel.ID} = ${TABLE_NAME}.${ORDER_ID}`);
        ordersModel.syncData(this.data);
        return ordersModel
    }



    static joinDeliverys() {
        const deliverysModel = require('../models/DeliverysModel');
        this.data.join.push(`LEFT JOIN ${deliverysModel.TABLE_NAME} on ${deliverysModel.TABLE_NAME}.${deliverysModel.ID} = ${TABLE_NAME}.${DELIVERY_ID}`);
        deliverysModel.syncData(this.data);
        return deliverysModel
    }

    static groupById(){
        this.data.groupBy.push(`${TABLE_NAME}.${ID}`);
        return this
    }


}

module.exports = LinksOrdersProductsModel;
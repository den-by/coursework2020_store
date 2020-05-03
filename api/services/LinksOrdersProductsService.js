"use strict";
const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');

class LinksOrdersProductsService extends require("./BaseService") {

    static async getByOrderId(id) {
        linksOrdersProductsModel
            .filterByOrderId(id);
        return linksOrdersProductsModel
            .getSQL();
    }

    static async getCashReportByDate(startDate, endDate) {
        linksOrdersProductsModel
            .filterByStartDateAdd(startDate)
            .filterByEndDateAdd(endDate)
            .orderByDateAdd()
            .joinDeliverys()
            .joinProducts()
            .selectTable();
        return linksOrdersProductsModel
            .getSQL();
    }

    static async getSumCountAndTotalPrice(startDate, endDate) {
        linksOrdersProductsModel
            .setShowDefaultTable(false)
            .selectSumCount()
            .selectSumTotalPrice()
            .filterByStartDateAdd(startDate)
            .filterByEndDateAdd(endDate);
        return await linksOrdersProductsModel
            .getSQL();
    }

    static async getSumTotalPrice(startDate, endDate) {
        const request = await linksOrdersProductsModel
            .filterByStartDateAdd(startDate)
            .filterByEndDateAdd(endDate)
            .setShowDefaultTable(false)
            .selectSumTotalPrice()
            .getSQL();
        return request[0];
    }

    static async getSumCount(startDate, endDate) {
        const request = await linksOrdersProductsModel
            .filterByStartDateAdd(startDate)
            .filterByEndDateAdd(endDate)
            .setShowDefaultTable(false)
            .selectSumCount()
            .getSQL();
        return request[0];
    }

    static async delete(id) {
        await pool.query(`delete from links_orders_products where id=${id}`);
        return 0;
    }

    static async update(id, count, deliveryId, productName, productPrice) {
        await pool.query(`update links_orders_products set count=${count},delivery_id=${deliveryId},name='${productName}',price='${productPrice}' where id=${id}`);
        return 0;
    }

    static async create(orderId, count, deliveryId, productName, productPrice) {
        await pool.query(`insert links_orders_products set order_id=${orderId},count=${count},delivery_id=${deliveryId},name='${productName}',price='${productPrice}'`);
        return 0;
    }
}

module.exports = LinksOrdersProductsService;
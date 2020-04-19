"use strict";
const ID = 'id';
const TABLE_NAME = 'deliverys';
const DATE_ADD = 'date_add';
const PRODUCT_ID = 'product_id';
const TOTAL_PRICE = 'total_price';
const SUM_COUNT = 'sum_count';
const SUM_TOTAL_PRICE = 'sum_total_price';
const PURCHASE_PRICE = 'purchase_price';
const DELIVERY_HOUR = 'delivery_hour';
const SUPPLIER_ID = 'supplier_id';
const COUNT = 'count';
const FIELDS = [
    ID, PRODUCT_ID, DATE_ADD, PURCHASE_PRICE, DELIVERY_HOUR, COUNT
];

class DeliveryModel extends require("./BaseModel") {

    static get SUPPLIER_ID() {
        return SUPPLIER_ID;
    }

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static get PRODUCT_ID() {
        return PRODUCT_ID;
    }

    static selectSumCount() {
        this.data.select.push(`sum(${TABLE_NAME}.${COUNT}) as ${SUM_COUNT}`);
        return this;
    }

    static selectSumTotalPrice() {
        this.data.select.push(`sum(${TABLE_NAME}.${TOTAL_PRICE}) as ${SUM_TOTAL_PRICE}`);
        return this;
    }

    static filterByDelivery(startData, endData, productId = null) {
        this.filterByProductId(productId);
        // if (productId) {
        //     this.data.where.push(`${TABLE_NAME}.${PRODUCT_ID} = ${productId}`);
        // }

        this.filterByDateAdd(startData, endData);
        // if (startData && endData) {
        //     const parseStartDate = Date.parse(startData);
        //     const parseEndDate = Date.parse(endData);
        //     if (parseStartDate && parseEndDate) {
        //         this.data.where.push(`${TABLE_NAME}.${DATE_ADD} > ${startData}`);
        //         this.data.where.push(`${TABLE_NAME}.${DATE_ADD} < ${endData}`);
        //     }
        // }
        return this;
    }

    static filterByProductId(productId) {
        if (productId) {
            this.data.where.push(`${TABLE_NAME}.${PRODUCT_ID} = ${productId}`);
        }
    }

    static filterByDateAdd(startData, endData) {
        if (startData && endData) {
            const parseStartDate = Date.parse(startData);
            const parseEndDate = Date.parse(endData);
            if (parseStartDate) {
                this.data.where.push(`${TABLE_NAME}.${DATE_ADD} > ${startData}`);
            }
            if (parseEndDate) {
                this.data.where.push(`${TABLE_NAME}.${DATE_ADD} < ${endData}`);
            }

        }
        return this;
    }

    static joinProducts() {
        const ProductsModel = require('../models/ProductsModel');
        this.data.join.push(`JOIN ${ProductsModel.TABLE_NAME} on ${ProductsModel.TABLE_NAME}.${ProductsModel.ID} = ${TABLE_NAME}.${PRODUCT_ID}`);
        ProductsModel.syncData(this.data);
        return ProductsModel;
    }

    static joinSuppliers() {
        const SuppliersModel = require('../models/SuppliersModel');
        this.data.join.push(`JOIN ${SuppliersModel.TABLE_NAME} on ${SuppliersModel.TABLE_NAME}.${SuppliersModel.ID} = ${TABLE_NAME}.${SUPPLIER_ID}`);
        SuppliersModel.syncData(this.data);
        return SuppliersModel;
    }


    static joinWriteoffs() {
        const WriteoffsModel = require('../models/WriteoffsModel');
        this.data.join.push(`JOIN ${WriteoffsModel.TABLE_NAME} on ${WriteoffsModel.TABLE_NAME}.${WriteoffsModel.PRODUCT_ID} = ${TABLE_NAME}.${ID}`);
        WriteoffsModel.syncData(this.data);
        return WriteoffsModel;
    }

    static joinLinksOrdersProducts(where) {
        const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');
        if (where) {
            // Object.entries( where )
            const reduce = (obj, fun, initialValue) =>
                Object.entries(obj).reduce(
                    (prev, [key, value]) => fun(prev, key, value),
                    initialValue
                );
            const joinWhere = reduce(where, (prev, key, value) => {
                return `${prev} and ${linksOrdersProductsModel.TABLE_NAME}.${key} = ${value}`
            }, '')

        }
        this.data.join.push(`LEFT JOIN ${linksOrdersProductsModel.TABLE_NAME} on ${TABLE_NAME}.${ID} = ${linksOrdersProductsModel.TABLE_NAME}.${linksOrdersProductsModel.PRODUCT_ID}`);
        linksOrdersProductsModel.syncData(this.data);
        return linksOrdersProductsModel;
    }

    static joinLinksOrdersProductsByStartDateAndEndDate(startDate, endDate) {
        const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');
        if (startDate) {
            startDate = ` and ${linksOrdersProductsModel.TABLE_NAME}.${linksOrdersProductsModel.DATE_ADD} > ${startDate}`
        }
        if (endDate) {
            endDate = ` and ${linksOrdersProductsModel.TABLE_NAME}.${linksOrdersProductsModel.DATE_ADD} < ${endDate}`
        }
        this.data.join.push(`LEFT JOIN ${linksOrdersProductsModel.TABLE_NAME} on ${TABLE_NAME}.${ID} = ${linksOrdersProductsModel.TABLE_NAME}.${linksOrdersProductsModel.PRODUCT_ID} ${startDate} ${endDate}`);
        linksOrdersProductsModel.syncData(this.data);
        return linksOrdersProductsModel;
    }
}

module.exports = DeliveryModel;
"use strict";
const ID = 'id';
const TABLE_NAME = 'deliverys';
const DATE_ADD = 'date_add';
const PRODUCT_ID = 'product_id';
const TOTAL_PRICE = 'total_price';
const STORAGE_ID = 'storage_id';
const SUM_COUNT = 'sum_count';
const SUM_TOTAL_PRICE = 'sum_total_price';
const DELIVERY_PRICE = 'delivery_price';
const COUNT_IN_STORAGE = 'count_in_storage';
const SUPPLIER_ID = 'supplier_id';
const COUNT = 'count';
const FIELDS = [
    ID, PRODUCT_ID, DATE_ADD, DELIVERY_PRICE, COUNT
];

class DeliverysModel extends require("./BaseModel") {

    static get SUPPLIER_ID() {
        return SUPPLIER_ID;
    }

    static get ID() {
        return ID;
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

    // static filterByDelivery(startData, endData, productId = null) {
    //     this.filterByProductId(productId);
    //     // if (productId) {
    //     //     this.data.where.push(`${TABLE_NAME}.${DELIVERY_ID} = ${productId}`);
    //     // }
    //
    //     this.filterByDateAdd(startData, endData);
    //     // if (startData && endData) {
    //     //     const parseStartDate = Date.parse(startData);
    //     //     const parseEndDate = Date.parse(endData);
    //     //     if (parseStartDate && parseEndDate) {
    //     //         this.data.where.push(`${TABLE_NAME}.${DATE_ADD} > ${startData}`);
    //     //         this.data.where.push(`${TABLE_NAME}.${DATE_ADD} < ${endData}`);
    //     //     }
    //     // }
    //     return this;
    // }

    static filterByProductId(productId) {
        if (productId) {
            this.data.where.push(`${TABLE_NAME}.${PRODUCT_ID} = ${productId}`);
        }
    }

    static filterByDateAdd(startData, endData) {
        if (startData && endData) {
            this.filterByEndDateAdd(startData);
            this.filterByEndDateAdd(endData);
        }
        return this;
    }

    static filterByStartDateAdd(startData) {
        if (startData) {
            const parseStartDate = Date.parse(startData);
            if (parseStartDate) {
                this.data.where.push(`${TABLE_NAME}.${DATE_ADD} > ${startData}`);
            }
        }
        return this;
    }

    static filterByEndDateAdd(endData) {
        if (endData) {
            const parseEndDate = Date.parse(endData);
            if (parseEndDate) {
                this.data.where.push(`${TABLE_NAME}.${DATE_ADD} < ${endData}`);
            }
        }
        return this;
    }

    static joinProducts() {
        const productsModel = require('../models/ProductsModel');
        this.data.join.push(`JOIN ${productsModel.TABLE_NAME} on ${productsModel.TABLE_NAME}.${productsModel.ID} = ${TABLE_NAME}.${PRODUCT_ID}`);
        productsModel.syncData(this.data);
        return productsModel;
    }

    static joinSuppliers() {
        const suppliersModel = require('../models/SuppliersModel');
        this.data.join.push(`JOIN ${suppliersModel.TABLE_NAME} on ${suppliersModel.TABLE_NAME}.${suppliersModel.ID} = ${TABLE_NAME}.${SUPPLIER_ID}`);
        suppliersModel.syncData(this.data);
        return suppliersModel;
    }

    static joinStorage() {
        const storageModel = require('./StorageModel');
        this.data.join.push(`JOIN ${storageModel.TABLE_NAME} on ${storageModel.TABLE_NAME}.${storageModel.ID} = ${TABLE_NAME}.${STORAGE_ID}`);
        storageModel.syncData(this.data);
        return storageModel;
    }


    static joinWriteoffs() {
        const writeoffsModel = require('../models/WriteoffsModel');
        this.data.join.push(`JOIN ${writeoffsModel.TABLE_NAME} on ${writeoffsModel.TABLE_NAME}.${writeoffsModel.DELIVERY_ID} = ${TABLE_NAME}.${ID}`);
        writeoffsModel.syncData(this.data);
        return writeoffsModel;
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
        this.data.join.push(`LEFT JOIN ${linksOrdersProductsModel.TABLE_NAME} on ${TABLE_NAME}.${ID} = ${linksOrdersProductsModel.TABLE_NAME}.${linksOrdersProductsModel.DELIVERY_ID}`);
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
        this.data.join.push(`LEFT JOIN ${linksOrdersProductsModel.TABLE_NAME} on ${TABLE_NAME}.${ID} = ${linksOrdersProductsModel.TABLE_NAME}.${linksOrdersProductsModel.DELIVERY_ID} ${startDate} ${endDate}`);
        linksOrdersProductsModel.syncData(this.data);
        return linksOrdersProductsModel;
    }

    static selectCountInStorage() {
        const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');
        this.data.select.push(`${TABLE_NAME}.${COUNT}-${linksOrdersProductsModel.TABLE_NAME}.${linksOrdersProductsModel.COUNT} as ${COUNT_IN_STORAGE}`);
        return this;
    }

    static filterByMinCount(minCount = 1) {
        const linksOrdersProductsModel = require('../models/LinksOrdersProductsModel');
        this.data.where.push(`${TABLE_NAME}.${COUNT}-${linksOrdersProductsModel.TABLE_NAME}.${linksOrdersProductsModel.COUNT} > ${minCount}`);
        return this;
    }
}

module.exports = DeliverysModel;
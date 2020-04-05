"use strict";
const ID = 'id';
const TABLE_NAME = 'deliverys';
const DATE_ADD = 'date_add';
const PRODUCT_ID = 'product_id';
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

    static filterByDelivery(startData, endData, productId = null) {
        if (productId) {
            this.data.where.push(`${TABLE_NAME}.${PRODUCT_ID} = ${productId}`);
        }
        if (startData && endData) {
            const parseStartDate = Date.parse(startData);
            const parseEndDate = Date.parse(endData);
            if (parseStartDate && parseEndDate) {
                this.data.where.push(`${TABLE_NAME}.${DATE_ADD} > ${startData}`);
                this.data.where.push(`${TABLE_NAME}.${DATE_ADD} < ${endData}`);
            }
        }
        return this;
    }

    static joinProducts () {
        const ProductsModel = require('../models/ProductsModel');
        this.data.join.push(`JOIN ${ProductsModel.TABLE_NAME} on ${ProductsModel.TABLE_NAME}.${ProductsModel.ID} = ${TABLE_NAME}.${PRODUCT_ID}`);
        return ProductsModel.syncData(this.data);
        // return ProductsModel;
    };

    static joinSuppliers () {
        const SuppliersModel = require('../models/SuppliersModel');
        this.data.join.push(`JOIN ${SuppliersModel.TABLE_NAME} on ${SuppliersModel.TABLE_NAME}.${SuppliersModel.ID} = ${TABLE_NAME}.${SUPPLIER_ID}`);
        return SuppliersModel.syncData(this.data);
        // return SuppliersModel;
    };

    static selectAggregateCount = () => {
        this.data.select.push(`count(${TABLE_NAME}.${COUNT}) as aggregate_count`)
    }


    static joinWriteoffs()  {
        const WriteoffsModel = require('../models/WriteoffsModel');
        this.data.join.push(`JOIN ${WriteoffsModel.TABLE_NAME} on ${WriteoffsModel.TABLE_NAME}.${WriteoffsModel.PRODUCT_ID} = ${TABLE_NAME}.${ID}`);
        return WriteoffsModel.syncData(this.data);
        // return WriteoffsModel;
    }
}

module.exports = DeliveryModel;
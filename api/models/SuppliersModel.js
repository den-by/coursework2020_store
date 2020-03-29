"use strict";
const LinksProductsSuppliersModel = require('../models/LinksProductsSuppliersModel');
const DeliveryModel = require('../models/DeliveryModel');
const TABLE_NAME = "suppliers";
const PRODUCT_ID = "product_id";

const START_DATE = 'start_date';
const END_DATE = 'end_date';
const MIN_VALUE = 'min_value';
const DELIVERYS_TABLE = 'deliverys';
const DELIVERYS_PRODUCT_ID = 'deliverys.product_id';

const ID = 'id';
const NAME = 'supplier_name';
const SUPPLIER_TYPE_ID = "supplier_type_id";
const FIELDS = [
    ID, SUPPLIER_TYPE_ID, NAME
];

class SuppliersModel extends require("./BaseModel") {

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static get SUPPLIER_TYPE_ID() {
        return SUPPLIER_TYPE_ID;
    }

    static getByType(req) {
        this.joinSupplierType();

        if (req.query[SUPPLIER_TYPE_ID]) {
            this.filterBySupplierType(req);
        }
        this.filterByProductId(req);

        // let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.filterByDelivery(req);

        return this.getSQL();
    };

    static filterBySupplierType(supplier_type_id) {
        if (supplier_type_id) {
            this.where.push(`${TABLE_NAME}.${SUPPLIER_TYPE_ID} = ${supplier_type_id}`);
        }
        return this;
    }

    static joinSupplierType() {
        this.join.push("JOIN supplier_types on supplier_types.id = suppliers.supplier_type_id");
        return this;
    }

    static filterByProductId(product_id) {
        // if (product_id) {
        this.joinLinkProductsSuppliers();
        if (product_id) {
            LinksProductsSuppliersModel.filterByProductId.call(this, product_id);
        }
        return this;
    }

    static selectPriceDeliveryTime() {
        this.tables.push(LinksProductsSuppliersModel);
        return this;
    }

    static joinLinkProductsSuppliers() {
        this.join.push(`JOIN ${LinksProductsSuppliersModel.TABLE_NAME} on ${LinksProductsSuppliersModel.TABLE_NAME}.${LinksProductsSuppliersModel.SUPPLIER_ID} = ${TABLE_NAME}.${ID}`);
        return this
    }

    static filterByDelivery(startData, endData, minValue, productId) {
        // if (product_id) {
        if (startData && endData && minValue && productId) {
            this.join.push(`JOIN ${DeliveryModel.TABLE_NAME} on ${DeliveryModel.TABLE_NAME}.${DeliveryModel.SUPPLIER_ID} = ${TABLE_NAME}.${ID}`);
            DeliveryModel.filterByDelivery.call(this, startData, endData, minValue, productId);
            this.groupBy.push(`${TABLE_NAME}.id`);
            this.having.push(`sum(${DELIVERYS_TABLE}.count) >= ${minValue}`);
        }
        // }
        // if (req.query[START_DATE] && req.query[END_DATE] && req.query[MIN_VALUE] && req.query[DELIVERYS_PRODUCT_ID]) {
        //     const startDate = Date.parse(req.query[START_DATE]);
        //     const endDate = Date.parse(req.query[END_DATE]);
        //     if (startDate && endDate) {
        //         this.join.push("JOIN deliverys on deliverys.supplier_id = suppliers.id");
        //         this.where.push(`${DELIVERYS_PRODUCT_ID} = ${req.query[DELIVERYS_PRODUCT_ID]}`);
        //         this.where.push(`${DELIVERYS_TABLE}.date_add > ${req.query[START_DATE]}`);
        //         this.where.push(`${DELIVERYS_TABLE}.date_add < ${req.query[END_DATE]}`);
        //         this.groupBy.push(`${TABLE_NAME}.id`);
        //         this.having.push(`sum(${DELIVERYS_TABLE}.count) >= ${req.query[MIN_VALUE]}`);
        //     }
        // }
    }


}

module.exports = SuppliersModel;
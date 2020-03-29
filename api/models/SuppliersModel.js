"use strict";
const LinksProductsSuppliersModel = require('../models/LinksProductsSuppliersModel');
const DeliveryModel = require('../models/DeliveryModel');
const TABLE_NAME = "suppliers";
const DELIVERYS_TABLE = 'deliverys';

const ID = 'id';
const NAME = 'name';
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
        this.data.join.push("JOIN supplier_types on supplier_types.id = suppliers.supplier_type_id");
        return this;
    }

    static filterByProductId(product_id) {
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
        this.data.join.push(`JOIN ${LinksProductsSuppliersModel.TABLE_NAME} on ${LinksProductsSuppliersModel.TABLE_NAME}.${LinksProductsSuppliersModel.SUPPLIER_ID} = ${TABLE_NAME}.${ID}`);
        return this
    }

    static filterByDelivery(startData, endData, minValue, productId) {
        if (startData && endData && minValue && productId) {
            this.joinDelivery();
            DeliveryModel.filterByDelivery.call(this, startData, endData, minValue, productId);
            this.groupBy.push(`${TABLE_NAME}.id`);
            this.having.push(`sum(${DELIVERYS_TABLE}.count) >= ${minValue}`);
        }
    }

    static joinDelivery = () => {
        this.data.join.push(`JOIN ${DeliveryModel.TABLE_NAME} on ${DeliveryModel.TABLE_NAME}.${DeliveryModel.SUPPLIER_ID} = ${TABLE_NAME}.${ID}`);
        DeliveryModel.syncData(this.data);
        return DeliveryModel;
    }
}

module.exports = SuppliersModel;
"use strict";
const DeliveryModel = require('../models/DeliveryModel');
const TABLE_NAME = "suppliers";

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

    static get ID() {
        return ID;
    }

    static filterBySupplierType(supplier_type_id) {
        if (supplier_type_id) {
            this.data.where.push(`${TABLE_NAME}.${SUPPLIER_TYPE_ID} = ${supplier_type_id}`);
        }
        return this;
    }

    static joinSupplierType() {
        this.data.join.push("JOIN supplier_types on supplier_types.id = suppliers.supplier_type_id");
        return this;
    }

    static selectPriceDeliveryTime() {
        const LinksProductsSuppliersModel = require('../models/LinksProductsSuppliersModel');
        LinksProductsSuppliersModel.selectTable();
        this.data.tables.push(LinksProductsSuppliersModel);
        return this;
    }

    static joinLinkProductsSuppliers() {
        const LinksProductsSuppliersModel = require('../models/LinksProductsSuppliersModel');
        this.data.join.push(`LEFT JOIN ${LinksProductsSuppliersModel.TABLE_NAME} on ${LinksProductsSuppliersModel.TABLE_NAME}.${LinksProductsSuppliersModel.SUPPLIER_ID} = ${TABLE_NAME}.${ID}`);
        LinksProductsSuppliersModel.syncData(this.data);
        return LinksProductsSuppliersModel
    }

    static joinDelivery = () => {
        this.data.join.push(`LEFT JOIN ${DeliveryModel.TABLE_NAME} on ${DeliveryModel.TABLE_NAME}.${DeliveryModel.SUPPLIER_ID} = ${TABLE_NAME}.${ID}`);
        DeliveryModel.syncData(this.data);
        return DeliveryModel;
    }

    static filterByMinCount(minValue) {
        this.data.groupBy.push(`${SuppliersModel.TABLE_NAME}.id`);
        if (minValue) {
            this.data.having.push(`sum(${DeliveryModel.TABLE_NAME}.count) >= ${minValue}`);
        }
        return this
    }
}

module.exports = SuppliersModel;
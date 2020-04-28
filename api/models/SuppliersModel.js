"use strict";
const DeliveryModel = require('./DeliverysModel');
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
        const supplierTypesModel = require('../models/SupplierTypesModel');
        this.data.join.push(`LEFT JOIN ${supplierTypesModel.TABLE_NAME} on ${supplierTypesModel.TABLE_NAME}.${supplierTypesModel.ID} = ${TABLE_NAME}.${SUPPLIER_TYPE_ID}`);
        supplierTypesModel.syncData(this.data);
        return supplierTypesModel
    }

    static joinLinkProductsSuppliers() {
        const linksProductsSuppliersModel = require('../models/LinksProductsSuppliersModel');
        this.data.join.push(`LEFT JOIN ${linksProductsSuppliersModel.TABLE_NAME} on ${linksProductsSuppliersModel.TABLE_NAME}.${linksProductsSuppliersModel.SUPPLIER_ID} = ${TABLE_NAME}.${ID}`);
        linksProductsSuppliersModel.syncData(this.data);
        return linksProductsSuppliersModel
    }

    static joinDelivery() {
        this.data.groupBy.push(`${TABLE_NAME}.${ID}`);
        this.data.join.push(`LEFT JOIN ${DeliveryModel.TABLE_NAME} on ${DeliveryModel.TABLE_NAME}.${DeliveryModel.SUPPLIER_ID} = ${TABLE_NAME}.${ID}`);
        DeliveryModel.syncData(this.data);
        return DeliveryModel;
    }

    static groupById(){
        this.data.groupBy.push(`${TABLE_NAME}.${ID}`);
        return this
    }
}

module.exports = SuppliersModel;
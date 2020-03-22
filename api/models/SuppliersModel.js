"use strict";
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

    static  get(req) {
        this.join.push("JOIN supplier_types on supplier_types.id = suppliers.supplier_type_id");

        if (req.query[SUPPLIER_TYPE_ID]) {
            this.where.push(`${TABLE_NAME}.${SUPPLIER_TYPE_ID} = ${req.query[SUPPLIER_TYPE_ID]}`);
        }

        if (req.query[PRODUCT_ID]) {
            this.join.push("JOIN links_products_suppliers on links_products_suppliers.supplier_id = suppliers.id");
            this.join.push("JOIN products on products.id = links_products_suppliers.product_id");
        }

        // let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        if (req.query[START_DATE] && req.query[END_DATE] && req.query[MIN_VALUE] && req.query[DELIVERYS_PRODUCT_ID]) {
            const startDate = Date.parse(req.query[START_DATE]);
            const endDate = Date.parse(req.query[END_DATE]);
            if (startDate && endDate) {
                this.join.push("JOIN deliverys on deliverys.supplier_id = suppliers.id");
                this.where.push(`${DELIVERYS_PRODUCT_ID} = ${req.query[DELIVERYS_PRODUCT_ID]}`);
                this.where.push(`${DELIVERYS_TABLE}.date_add > ${req.query[START_DATE]}`);
                this.where.push(`${DELIVERYS_TABLE}.date_add < ${req.query[END_DATE]}`);
                this.groupBy.push(`${TABLE_NAME}.id`);
                this.having.push(`sum(${DELIVERYS_TABLE}.count) >= ${req.query[MIN_VALUE]}`);
            }
        }

        return  this.getSQL();
    };

    static async getByProduct(req) {
        // if (req.query[SUPPLIER_TYPE_ID]) {
        //     this.where.push(`${TABLE_NAME}.${SUPPLIER_TYPE_ID} = ${req.query[SUPPLIER_TYPE_ID]}`);
        // }

        // this.join.push("JOIN links_products_suppliers on links_products_suppliers.supplier_id = suppliers.id");
        // this.join.push("JOIN products on products.id = links_products_suppliers.product_id");

        if (req.query[PRODUCT_ID]) {

        }

        // let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        if (req.query[START_DATE] && req.query[END_DATE] && req.query[MIN_VALUE] && req.query[DELIVERYS_PRODUCT_ID]) {
            const startDate = Date.parse(req.query[START_DATE]);
            const endDate = Date.parse(req.query[END_DATE]);
            if (startDate && endDate) {
                this.join.push("JOIN deliverys on deliverys.supplier_id = suppliers.id");
                this.where.push(`${DELIVERYS_PRODUCT_ID} = ${req.query[DELIVERYS_PRODUCT_ID]}`);
                this.where.push(`${DELIVERYS_TABLE}.date_add > ${req.query[START_DATE]}`);
                this.where.push(`${DELIVERYS_TABLE}.date_add < ${req.query[END_DATE]}`);
                this.groupBy.push(`${TABLE_NAME}.id`);
                this.having.push(`sum(${DELIVERYS_TABLE}.count) >= ${req.query[MIN_VALUE]}`);
            }
        }

        return await this.getSQL();

    };


}

module.exports = SuppliersModel;
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
    static async get(req) {
        let selectedField = this.getSelectedField();
        let sql = `SELECT ${selectedField.join(', ')} FROM ${TABLE_NAME}`;

        let where = [];
        let join = ["JOIN supplier_types on supplier_types.id = suppliers.supplier_type_id"];
        let groupBy = [];
        let having = [];


        if (req.query[SUPPLIER_TYPE_ID]) {
            where.push(`${TABLE_NAME}.${SUPPLIER_TYPE_ID} = ${req.query[SUPPLIER_TYPE_ID]}`);
        }

        if (req.query[PRODUCT_ID]) {
            join.push("JOIN links_products_suppliers on links_products_suppliers.supplier_id = suppliers.id");
            join.push("JOIN products on products.id = links_products_suppliers.product_id");
        }

        // let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        if (req.query[START_DATE] && req.query[END_DATE] && req.query[MIN_VALUE] && req.query[DELIVERYS_PRODUCT_ID]) {
            const startDate = Date.parse(req.query[START_DATE]);
            const endDate = Date.parse(req.query[END_DATE]);
            if (startDate && endDate) {
                join.push("JOIN deliverys on deliverys.supplier_id = suppliers.id");
                where.push(`${DELIVERYS_PRODUCT_ID} = ${req.query[DELIVERYS_PRODUCT_ID]}`);
                where.push(`${DELIVERYS_TABLE}.date_add > ${req.query[START_DATE]}`);
                where.push(`${DELIVERYS_TABLE}.date_add < ${req.query[END_DATE]}`);
                groupBy.push(`${TABLE_NAME}.id`);
                having.push(`sum(${DELIVERYS_TABLE}.count) >= ${req.query[MIN_VALUE]}`);
            }
        }


        if (join.length > 0) {
            sql += ` ${join.join(" ")}`;
        }

        if (where.length > 0) {
            sql += ` where ${where.join(" and ")}`;
        }

        if (groupBy.length > 0) {
            sql += ` group by ${groupBy.join(" and ")}`;
        }

        if (having.length > 0) {
            sql += ` having ${having.join(" and ")}`;
        }

        const data = await pool.query(sql);
        return data[0];
        // res.send(data);
        // return data2;
        // Task.find({}, function(err, task) {
        //     if (err)
        //         res.send(err);
        //     res.json(task);
        // });
    };

    static getSelectedField() {
        let res = [];
        FIELDS.forEach(function (field) {
            res.push(`${TABLE_NAME}.${field} as ${TABLE_NAME}_${field}`);
        });
        return res;
    }


}

module.exports = SuppliersModel;
"use strict";
const TABLE_NAME = "suppliers";
const SUPPLIER_TYPE_ID = "supplier_type_id";
const PRODUCT_ID = "product_id";
const START_DATE = 'start_date';
const END_DATE = 'end_date';
const MIN_VALUE = 'min_value';
const ID = 'id';
const NAME = 'supplier_name';
const FIELDS = [
    ID, SUPPLIER_TYPE_ID, NAME
];

class SuppliersModel extends require("./BaseModel") {
    static async get(req) {
        let selectedField = this.getSelectedField();
        let sql = `SELECT ${selectedField.join(', ')} FROM ${TABLE_NAME}`;

        let where = [];
        let join = ["JOIN supplier_types on supplier_types.id = suppliers.supplier_type_id"];

        if (req.query[SUPPLIER_TYPE_ID]) {
            where.push(`${TABLE_NAME}.${SUPPLIER_TYPE_ID} = ${req.query[SUPPLIER_TYPE_ID]}`);
        }

        if (req.query[PRODUCT_ID]) {
            join.push("JOIN links_products_suppliers on links_products_suppliers.supplier_id = suppliers.id");
            join.push("JOIN products on products.id = links_products_suppliers.product_id");
        }

        if (req.query[START_DATE] && req.query[END_DATE] && req.query[MIN_VALUE]) {
            join.push("JOIN product_deliverys on product_deliverys.product_id = product.id");
            join.push("JOIN products on products.id = links_products_suppliers.product_id");
        }


        if (join.length > 0) {
            sql += ` ${join.join(" ")}`;
        }

        if (where.length > 0) {
            sql += ` where ${where.join(" and ")}`;
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
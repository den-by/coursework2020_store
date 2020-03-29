"use strict";
const suppliersModel = require('../models/SuppliersModel');

const LinksProductsSuppliersModel = require('../models/LinksProductsSuppliersModel');

class SuppliersService extends require("./BaseService") {
    static getByTypeIdProductIdDelivery(supplier_type_id, product_id, startData, endData, minValue, productId) {

        // let {startData: startData, endData: endData, MIN_VALUE: minValue, PRODUCT_ID: productId} = delivery;
        suppliersModel.filterBySupplierType(supplier_type_id).filterByProductId(product_id).filterByDelivery(startData, endData, minValue, productId);
        // LinksProductsSuppliersModel.filterByProductId.call(suppliersModel, product_id);
        // }
        // this.filterByProductId(product_id);

        // let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        // this.filterByDelivery(req);

        const sql = suppliersModel.getSQL();
        return sql;
    };

    static async getByProduct(productId) {
        // if (req.query[SUPPLIER_TYPE_ID]) {
        //     this.where.push(`${TABLE_NAME}.${SUPPLIER_TYPE_ID} = ${req.query[SUPPLIER_TYPE_ID]}`);
        // }

        // this.join.push("JOIN links_products_suppliers on links_products_suppliers.supplier_id = suppliers.id");
        // this.join.push("JOIN products on products.id = links_products_suppliers.product_id");

        suppliersModel.filterByProductId(productId);
        suppliersModel.selectPriceDeliveryTime();

        // let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // this.filterByDelivery(req);

        return suppliersModel.getSQL();

    };

}

module.exports = SuppliersService;
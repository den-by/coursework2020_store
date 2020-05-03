"use strict";
const ordersModel = require('../models/OrdersModel');

class OrdersService extends require("./BaseService") {

    static async getAll() {
        ordersModel
            .joinClients()
            .selectTable();
        return ordersModel
            .getSQL();
    }

    static async getById(id) {
        ordersModel
            .filterById(id)
            .joinClients()
            .selectTable();
        return ordersModel
            .getSQL();
    }

    static async create(clientId) {
        await pool.query(`insert orders set client_id=${clientId}`);
        return 0;
    }

    static async delete(id) {
        await pool.query(`delete from orders where id=${id}`);
        return 0;
    }


}

module.exports = OrdersService;
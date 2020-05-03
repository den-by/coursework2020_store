"use strict";
const TABLE_NAME = "orders";
const ID = 'id';
const DATE_ADD = 'date_add';
const DATE_UPD = 'date_upd';
const CLIENT_ID = "client_id";
const TOTAL_PRICE = "total_price";
const FIELDS = [
    ID, CLIENT_ID, DATE_ADD, TOTAL_PRICE, DATE_UPD
];

class OrdersModel extends require("./BaseModel") {

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static get CLIENT_ID() {
        return CLIENT_ID;
    }

    static get ID() {
        return ID;
    }

    static joinClients() {
        const clientsModel = require('../models/ClientsModel');
        this.data.join.push(`LEFT JOIN ${clientsModel.TABLE_NAME} on ${clientsModel.TABLE_NAME}.${clientsModel.ID} = ${TABLE_NAME}.${CLIENT_ID}`);
        clientsModel.syncData(this.data);
        return clientsModel
    }

    static joinLinksOrdersProducts() {
        const LinksOrdersProductsModel = require('../models/LinksOrdersProductsModel');
        this.data.join.push(`LEFT JOIN ${LinksOrdersProductsModel.TABLE_NAME} on ${LinksOrdersProductsModel.TABLE_NAME}.${LinksOrdersProductsModel.ORDER_ID} = ${TABLE_NAME}.${ID}`);
        LinksOrdersProductsModel.syncData(this.data);
        return LinksOrdersProductsModel
    }

    static filterByStartDateAdd(startDate) {
        if (startDate) {
            const parseStartDate = Date.parse(startDate);
            if (parseStartDate) {
                this.data.where.push(`${TABLE_NAME}.${DATE_ADD} > ${startDate.replace(/-/g, '').substr(2)} or ${TABLE_NAME}.${DATE_ADD} is null`);
            }
        }
        return this;
    }

    static filterByEndDateAdd(endDate) {
        if (endDate) {
            const parseEndDate = Date.parse(endDate);
            if (parseEndDate) {
                this.data.where.push(`${TABLE_NAME}.${DATE_ADD} < ${endDate.replace(/-/g, '').substr(2)} or ${TABLE_NAME}.${DATE_ADD} is null`);
            }
        }
        return this;
    }

    static filterByDate(startDate, endDate) {
        if (startDate) {
            this.data.where.push(`${TABLE_NAME}.${DATE_ADD} > ${startDate}`);
        }
        if (endDate) {
            this.data.where.push(`${TABLE_NAME}.${DATE_ADD} < ${endDate}`);
        }
        return this;
    }

    static filterById(id) {
        if (id) {
            this.data.where.push(`${TABLE_NAME}.${ID} = ${id}`);
        }
        return this;
    }
}

module.exports = OrdersModel;
"use strict";
const TABLE_NAME = "client_log";

const ID = 'id';
const EVENT = 'event';
const DATE_ADD = 'date_add'
const FIELDS = [
    ID, EVENT, DATE_ADD
];

class ClientLogModel extends require("./BaseModel") {

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static get ID() {
        return ID;
    }

    static orderById() {
        this.data.orderBy.push(`${TABLE_NAME}.${ID} DESC`);
        return this;
    }

}

module.exports = ClientLogModel;
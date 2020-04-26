"use strict";
const TABLE_NAME = "supplier_types";

const ID = 'id';
const NAME = 'name';
const FIELDS = [
    ID, NAME
];

class SupplierTypesModel extends require("./BaseModel") {

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static get ID() {
        return ID;
    }
}

module.exports = SupplierTypesModel;
"use strict";
const supplierTypesModel = require('../models/SupplierTypesModel');

class SupplierTypesService extends require("./BaseService") {

    static getAll() {
        return supplierTypesModel.getSQL();
    };
}

module.exports = SupplierTypesService;
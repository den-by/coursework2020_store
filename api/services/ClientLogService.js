"use strict";
const clientLogModel = require('../models/ClientLogModel');

class ClientLogService extends require("./BaseService") {

    static getLast20() {
        clientLogModel.limit(10)
            .orderById();
        return clientLogModel
            .getSQL();
    };

}

module.exports = ClientLogService;
"use strict";
const TABLE_NAME = "storage";
const ID = 'id';
const NAME = "name";
const COUNT = 'count';
const FIELDS = [
    ID, NAME
];

class StorageModel extends require("./BaseModel") {

    static get ID() {
        return ID;
    }

    static get FIELDS() {
        return FIELDS;
    }

    static get TABLE_NAME() {
        return TABLE_NAME;
    }

    static filterIdNotIn(ids) {
        this.data.where.push(`NOT IN ()`);
    }

    static selectAggregateCount() {
        this.data.select.push(`sum(${TABLE_NAME}.${COUNT}) as sum_count`);
        return this;
    }

    static filterByIdNotIn(ids) {
        this.data.where.push(`${TABLE_NAME}.${ID} not in ${ids}`);
        return this;
    }

}

module.exports = StorageModel;
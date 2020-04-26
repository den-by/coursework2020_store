"use strict";
const TABLE_NAME = "storage";
const ID = 'id';
const NAME = "name";
const COUNT = 'count';
const CAPACITY = 'capacity';
const FIELDS = [
    ID, NAME, CAPACITY
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

    static selectAggregateCount() {
        this.data.select.push(`sum(${TABLE_NAME}.${COUNT}) as sum_count`);
        return this;
    }

    static filterByIdNotIn(ids) {
        if(ids) {
            this.data.where.push(`${TABLE_NAME}.${ID} not in (${ids.join(',')})`);
            return this;
        }
    }

}

module.exports = StorageModel;
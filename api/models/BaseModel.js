class testClass {

    static data = {
        select: [],
        where: [],
        join: [],
        groupBy: [],
        having: [],
        tables: [],
        orderBy: [],
        showDefaultTable: true,
        limit: null,
    };


    static get FIELDS() {
        throw new SyntaxError("Данные некорректны");
    }

    static get TABLE_NAME() {
        throw new SyntaxError("Данные некорректны");
    }

    static syncData(data) {
        this.data = data;
        return this;
    }

    static selectTable() {
        this.data.tables.push(this);
        return this;
    }

    static setShowDefaultTable(value){
        this.data.showDefaultTable=value;
        return this;
    }

    static getAllSelectedField() {
        if(this.data.showDefaultTable){
            this.data.tables.unshift(this);
        }
        if (this.data.tables.length < 1 && this.data.select.length < 1) {
            this.data.tables.push(this)
        }
        this.data.tables.forEach((tables) => {
            let items = tables.getThisSelect();
            this.data.select = this.data.select.concat(items);
        });

        return this.data.select;
    }

    static getThisSelect() {
        let select = [];
        this.FIELDS.forEach((field) => {
            select.push(`${this.TABLE_NAME}.${field} as ${this.TABLE_NAME}_${field}`);
        });
        return select;
    }

    static limit(limit) {
        this.data.limit = limit;
        return this;
    }

    static async getSQL() {

        let sql = `SELECT ${this.getAllSelectedField().join(', ')} FROM ${this.TABLE_NAME}`;

        this.data.tables = [];
        this.data.select = [];

        if (this.data.join.length > 0) {
            sql += ` ${this.data.join.join(" ")}`;
        }
        this.data.join = [];

        if (this.data.where.length > 0) {
            sql += ` where ${this.data.where.join(" and ")}`;
        }
        this.data.where = [];

        if (this.data.groupBy.length > 0) {
            sql += ` group by ${this.data.groupBy.join(", ")}`;
        }
        this.data.groupBy = [];

        if (this.data.having.length > 0) {
            sql += ` having ${this.data.having.join(" and ")}`;
        }
        this.data.having = [];

        if (this.data.orderBy.length > 0) {
            sql += ` order by ${this.data.orderBy.join(", ")}`;
        }
        this.data.orderBy = [];

        if (this.data.limit > 0) {
            sql += ` limit ${this.data.limit}`;
        }
        this.data.limit = null;

        console.log(sql);
        const data = await pool.query(sql);
        return data[0];
    }

}

module.exports = testClass;
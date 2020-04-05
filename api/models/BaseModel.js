class testClass {

    static data = {
        select: [],
        where: [],
        join: [],
        groupBy: [],
        having: [],
        tables: [],
    };

    static syncData(data) {
        this.data = data;
        return this;
    }

    static addToSelectThis() {
        this.data.tables.push(this);
        return this;
    }

    static get FIELDS() {
        throw new SyntaxError("Данные некорректны");
    }

    static get TABLE_NAME() {
        throw new SyntaxError("Данные некорректны");
    }

    static getAllSelectedField() {
        this.data.tables.unshift(this);
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
            sql += ` group by ${this.data.groupBy.join(" and ")}`;
        }

        this.data.groupBy = [];

        if (this.data.having.length > 0) {
            sql += ` having ${this.data.having.join(" and ")}`;
        }

        this.data.having = [];

        console.log(sql);
        const data = await pool.query(sql);
        return data[0];
    }

}

module.exports = testClass;
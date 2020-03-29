class testClass {

    static select = [];
    static where = [];
    static join = [];
    static groupBy = [];
    static having = [];
    static tables = [];

    static get FIELDS() {
        throw new SyntaxError("Данные некорректны");
    }

    static get TABLE_NAME() {
        throw new SyntaxError("Данные некорректны");
    }

    static getAllSelectedField() {
        let select = [];
        this.tables.unshift(this);
        this.tables.forEach((tables) => {
            let items = tables.getThisSelect();
            select = select.concat(items);
        });

        return select;
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

        if (this.join.length > 0) {
            sql += ` ${this.join.join(" ")}`;
        }

        this.join = [];

        if (this.where.length > 0) {
            sql += ` where ${this.where.join(" and ")}`;
        }
        this.where = [];

        if (this.groupBy.length > 0) {
            sql += ` group by ${this.groupBy.join(" and ")}`;
        }

        this.groupBy = [];

        if (this.having.length > 0) {
            sql += ` having ${this.having.join(" and ")}`;
        }

        this.having = [];

        console.log(sql);
        const data = await pool.query(sql);
        return data[0];
    }

}

module.exports = testClass;
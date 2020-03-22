class testClass {

    static where = [];
    static join = [];
    static groupBy = [];
    static having = [];

    static get FIELDS() {
        throw new SyntaxError("Данные некорректны");
    }

    static get TABLE_NAME() {
        throw new SyntaxError("Данные некорректны");
    }

    static getSelectedField() {
        let res = [];
        this.FIELDS.forEach((field) => {
            res.push(`${this.TABLE_NAME}.${field} as ${this.TABLE_NAME}_${field}`);
        });
        return res;
    }

    static async getSQL() {

        let sql = `SELECT ${this.getSelectedField().join(', ')} FROM ${this.TABLE_NAME}`;

        if (this.join.length > 0) {
            sql += ` ${this.join.join(" ")}`;
        }

        if (this.where.length > 0) {
            sql += ` where ${this.where.join(" and ")}`;
        }

        if (this.groupBy.length > 0) {
            sql += ` group by ${this.groupBy.join(" and ")}`;
        }

        if (this.having.length > 0) {
            sql += ` having ${this.having.join(" and ")}`;
        }

        const data = await pool.query(sql);
        return data[0];
    }

}

module.exports = testClass;
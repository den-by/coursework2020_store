class testClass {

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

}

module.exports = testClass;
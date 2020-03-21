var suppliersModel = require('../models/suppliersModel');

class testClass {
    constructor(height = 0, width = 0) {
        this.height = height;
        this.width = width;
    }

    static async list_all_suppliers(req, res) {
        let data = await suppliersModel.get(req, res);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }


}

module.exports = testClass;
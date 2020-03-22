var suppliersModel = require('../models/SuppliersModel');

class SuppliersController extends require('./BaseController'){

    static async list_all_suppliers(req, res) {
         let data = await suppliersModel.get(req, res);
         res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }

    static async suppliers_by_products(req, res) {
        let data = await suppliersModel.getByProduct(req, res);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }
}

module.exports = SuppliersController;
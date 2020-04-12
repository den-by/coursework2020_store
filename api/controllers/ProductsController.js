const ProductsService = require('../services/ProductsService');
const START_DATE = 'start_date';
const END_DATE = 'end_date';

class ProductsController extends require('./BaseController') {

    static async getDefectedDeliveryByProducts(req, res) {
        let data = await ProductsService.getDefectedDeliveryByProducts(req.query[START_DATE],req.query[END_DATE]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }

    static async getTopProducts(req, res) {
        let data = await ProductsService.getTopProducts();
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }
}

module.exports = ProductsController;
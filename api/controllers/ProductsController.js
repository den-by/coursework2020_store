const productsService = require('../services/ProductsService');
const START_DATE = 'start_date';
const END_DATE = 'end_date';
const MONTH_COUNT = 'month_count';

class ProductsController extends require('./BaseController') {

    static async getDefectedDeliveryByProducts(req, res) {
        let data = await productsService.getDefectedDeliveryByProducts(req.query[START_DATE],req.query[END_DATE]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }

    static async getTopProducts(req, res) {
        let data = await productsService.getTopProducts();
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }

    static async getAverageSale(req, res) {
        let data = await productsService.getProductsAndAverageSale(req.query[MONTH_COUNT]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }

    static async getSelProductsByDay(req, res) {
        let data = await productsService.getSelProductsByDay(req.query[START_DATE]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }
}

module.exports = ProductsController;
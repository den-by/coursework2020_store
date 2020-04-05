const ProductsService = require('../services/ProductsService');
const productId = 'product_id';
const START_DATE = 'start_date';
const END_DATE = 'end_date';

class SuppliersController extends require('./BaseController') {

    static async getDefectedDeliveryByProducts(req, res) {
        let data = await ProductsService.getDefectedDeliveryByProducts(req.query[productId]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }
}

module.exports = SuppliersController;
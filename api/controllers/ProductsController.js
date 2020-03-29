const ProductsService = require('../services/ProductsService');
const supplierTypeId = 'supplier_type_id';
const productId = 'product_id';
const START_DATE = 'start_date';
const END_DATE = 'end_date';
const MIN_VALUE = 'min_value';
const DELIVERYS_PRODUCT_ID = 'deliverys.product_id';

class SuppliersController extends require('./BaseController') {

    static async getDefectedDeliveryByProducts(req, res) {
        let data = await ProductsService.getDefectedDeliveryByProducts(req.query[productId]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }
}

module.exports = SuppliersController;
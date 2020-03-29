const suppliersModel = require('../models/SuppliersModel');
const deliveryModel = require('../models/DeliveryModel');
const suppliersService = require('../services/SuppliersService');
const supplierTypeId = 'supplier_type_id';
const productId = 'product_id';
const START_DATE = 'start_date';
const END_DATE = 'end_date';
const MIN_VALUE = 'min_value';
const DELIVERYS_PRODUCT_ID = 'deliverys.product_id';

class SuppliersController extends require('./BaseController') {

    static async list_all_suppliers(req, res) {
        // const data = await suppliersModel.getByType(req, res);

        // const delivery = [req.query['start_date'], req.query[''] && req.query[MIN_VALUE] && req.query[DELIVERYS_PRODUCT_ID]];
        // const suppliers = await suppliersService.getByTypeIdProductIdDelivery(req.query[supplierTypeId], req.query[productId], req.query[START_DATE], req.query[END_DATE], req.query[MIN_VALUE], req.query[DELIVERYS_PRODUCT_ID]);
        const suppliers = await suppliersService.getByTypeIdProductIdDelivery(req.query[supplierTypeId], req.query[productId], req.query[START_DATE], req.query[END_DATE], req.query[MIN_VALUE], req.query[DELIVERYS_PRODUCT_ID]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': suppliers})
    }

    static async suppliers_by_products(req, res) {
        let data = await suppliersService.getByProduct(req.query[productId]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }
}

module.exports = SuppliersController;
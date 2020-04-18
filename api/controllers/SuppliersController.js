const suppliersService = require('../services/SuppliersService');
const linksOrdersProductsService = require('../services/LinksOrdersProductsService');
const supplierTypeId = 'supplier_type_id';
const productId = 'product_id';
const START_DATE = 'start_date';
const END_DATE = 'end_date';
const MIN_VALUE = 'min_value';
const DELIVERYS_PRODUCT_ID = 'deliverys.product_id';

class SuppliersController extends require('./BaseController') {

    static async listAllSuppliers(req, res) {
        const suppliers = await suppliersService.getByTypeIdProductIdDelivery(req.query[supplierTypeId], req.query[productId], req.query[START_DATE], req.query[END_DATE], req.query[MIN_VALUE], req.query[DELIVERYS_PRODUCT_ID]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': suppliers})
    }

    static async getSuppliersAndDeliveryTimeByProduct(req, res) {
        let data = await suppliersService.getSuppliersAndDeliveryTimeByProduct(req.query[productId]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }

    static async getTopSuppliers(req, res) {
        let data = await suppliersService.getTopSuppliersByProduct(req.query[productId]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }

    static async getProfit(req, res) {

        const  {sum_count: sum_count ,sum_total_price : sum_total_price} = (await linksOrdersProductsService.getSumCountAndTotalPrice(req.query[START_DATE], req.query[END_DATE]))[0];
        // getSumCountAndTotalPrice
        let data = await suppliersService.getSuppliersAndProfit(req.query[START_DATE], req.query[END_DATE], sum_count , sum_total_price);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }


}

module.exports = SuppliersController;
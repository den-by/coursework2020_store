const clientService = require('../services/ClientsService');
const productsService = require('../services/ProductsService');
const DELIVERYS_PRODUCT_ID = 'deliverys_product_id';
const START_DATE = 'start_date';
const END_DATE = 'end_date';
const MIN_VALUE = 'min_value';

class ClientsController extends require('./BaseController') {

    static async clientAndCount(req, res) {
        const products = await productsService.getAll();
        let clients = await clientService.getClientAndAggregateCountByProductMinValueDate(req.query[DELIVERYS_PRODUCT_ID], req.query[START_DATE], req.query[END_DATE], req.query[MIN_VALUE]);
        res.render('clients', {
            title: 'Greetings form Handlebars',
            'data': {clients: clients, products: products},
            query: req.query
        })
    }
}

module.exports = ClientsController;
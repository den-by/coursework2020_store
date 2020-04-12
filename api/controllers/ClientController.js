const clientService = require('../services/ClientService');
const PRODUCT_ID = 'product_id';
const START_DATE = 'start_date';
const END_DATE = 'end_date';
const MIN_COUNT = 'min_count';

class ClientController extends require('./BaseController') {

    static async clientAndCount(req, res) {
        let data = await clientService.getClientAndAggregateCountByProductMinValueDate(req.query[PRODUCT_ID], req.query[START_DATE], req.query[END_DATE], req.query[MIN_COUNT]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }
}

module.exports = ClientController;
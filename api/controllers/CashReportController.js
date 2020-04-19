const linksOrdersProductsService = require('../services/LinksOrdersProductsService');
const deliveryService = require('../services/DeliveryService');
const START_DATE = 'start_date';
const END_DATE = 'end_date';

class CashReportController extends require('./BaseController') {

    static async get(req, res) {
        let data = await linksOrdersProductsService.getCashReportByDate(req.query[START_DATE],req.query[END_DATE]);

        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }


}

module.exports = CashReportController;
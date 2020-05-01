const linksOrdersProductsService = require('../services/LinksOrdersProductsService');
const START_DATE = 'start_date';
const END_DATE = 'end_date';

class SalesController extends require('./BaseController') {

    static async get(req, res) {
        const sales = await linksOrdersProductsService.getCashReportByDate(req.query[START_DATE], req.query[END_DATE]);
        const count = await linksOrdersProductsService.getSumCount(req.query[START_DATE], req.query[END_DATE]);
        const sumTotalPrice = await linksOrdersProductsService.getSumTotalPrice(req.query[START_DATE], req.query[END_DATE]);

        res.render('sales', {
            title: 'Greetings form Handlebars',
            data: {sales: sales, ...count, ...sumTotalPrice},
            query: req.query
        })
    }
}

module.exports = SalesController;
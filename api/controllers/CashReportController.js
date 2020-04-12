const cashReportService = require('../services/CashReportService');
const START_DATE = 'start_date';
const END_DATE = 'end_date';

class CashReportController extends require('./BaseController') {

    static async get(req, res) {
        let data = await cashReportService.getCashReportByDate(req.query[START_DATE],req.query[END_DATE]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }
}

module.exports = CashReportController;
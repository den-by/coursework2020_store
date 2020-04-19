const deliverysService = require('../services/DeliverysService');
const START_DATE = 'start_date';
const END_DATE = 'end_date';
class StorageController extends require('./BaseController') {

    static async getAll(req, res) {
        let data = await deliverysService.getInStorage(req.query[START_DATE],req.query[END_DATE]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }
}

module.exports = StorageController;
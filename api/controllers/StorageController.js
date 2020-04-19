const deliverysService = require('../services/DeliverysService');
const storageService = require('../services/StorageService');
const START_DATE = 'start_date';
const END_DATE = 'end_date';
class StorageController extends require('./BaseController') {

    static async getAll(req, res) {
        let data = await deliverysService.getInStorage(req.query[START_DATE],req.query[END_DATE]);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }

    static async getFreeCells(req, res) {
        const data = await deliverysService.getInStorage();
        const b = storageService.getNotId(data);
        res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }
}

module.exports = StorageController;
const deliverysService = require('../services/DeliverysService');
const storageService = require('../services/StorageService');
const START_DATE = 'start_date';
const END_DATE = 'end_date';

class StorageController extends require('./BaseController') {

    static async getAll(req, res) {
        const storage = await deliverysService.getInStorage(req.query[START_DATE], req.query[END_DATE]);
        res.render('storage', {title: 'Greetings form Handlebars', 'data': {storage: storage}, query: req.query})
    }

    static async getFreeCells(req, res) {
        const storageData = await deliverysService.getInStorage();
        const notEmptyIds = Array.from(storageData, x => x['storage_id']);
        const emptyStorage = storageService.getFreeIdByNotEmptyId(notEmptyIds);
        res.render('home', {title: 'Greetings form Handlebars', 'data': emptyStorage})
    }
}

module.exports = StorageController;
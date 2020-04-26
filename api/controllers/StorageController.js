const deliverysService = require('../services/DeliverysService');
const storageService = require('../services/StorageService');
const productsService = require('../services/ProductsService');
const START_DATE = 'start_date';
const END_DATE = 'end_date';
const PRODUCT_ID = 'product_id';

class StorageController extends require('./BaseController') {

    static async getAll(req, res) {
        const storage = await deliverysService.getInStorage(req.query[START_DATE], req.query[END_DATE], req.query[PRODUCT_ID]);
        const products = await productsService.getAll();
        res.render('storage', {
            title: 'Склад',
            'data': {storage: storage, products: products},
            query: req.query
        })
    }

    static async getFreeCells(req, res) {
        const storageData = await deliverysService.getInStorage();
        const notEmptyIds = Array.from(storageData, x => x['storage_id']);
        const emptyStorage = await storageService.getFreeIdByNotEmptyId(notEmptyIds);
        res.render('emptyStorage', {title: 'Greetings form Handlebars', 'data': {emptyStorage: emptyStorage}})
    }
}

module.exports = StorageController;
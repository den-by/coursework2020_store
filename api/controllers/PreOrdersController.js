const preOrdersService = require('../services/PreOrdersService');

class PreOrdersController extends require('./BaseController') {

    static async getAll(req, res) {
        const preOrders = await preOrdersService.getAll();
        const count = await preOrdersService.getCount();
        const sumTotalPrice = await preOrdersService.getSumTotalPrice();
        res.render('preOrders', {
            data: {preOrders: preOrders, ...count, ...sumTotalPrice}
        })
    }
}

module.exports = PreOrdersController;
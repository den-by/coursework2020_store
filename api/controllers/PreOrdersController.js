const preOrdersService = require('../services/PreOrdersService');

class PreOrdersController extends require('./BaseController') {

    static async getAll(req, res) {
        const preOrders = await preOrdersService.getAll();
        const count = (await preOrdersService.getCount())[0];
        const sumTotalPrice = (await preOrdersService.getSumTotalPrice())[0];
        res.render('home', {
            title: 'Greetings form Handlebars',
            'data': {...{preOrders: preOrders}, ...count, ...sumTotalPrice}
        })
    }
}

module.exports = PreOrdersController;
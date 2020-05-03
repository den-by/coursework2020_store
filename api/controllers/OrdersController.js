'use strict';

const ordersService = require('../services/OrdersService');
const linksOrdersProductsService = require('../services/LinksOrdersProductsService');
const deliverysService = require('../services/DeliverysService');
const clientsService = require('../services/ClientsService');
const clientLogService = require('../services/ClientLogService');

class OrdersController extends require('./BaseController') {

    static async orders(req, res) {
        const orders = await ordersService.getAll();
        const clients = await clientsService.getAll();
        res.render('orders', {
            title: 'Greetings form Handlebars',
            data: {orders: orders, clients: clients}
        })
    }

    static async log(req, res) {
        const clientLog = await clientLogService.getLast20();
        res.render('clientLog', {
            title: 'Greetings form Handlebars',
            data: {clientLog: clientLog}
        })
    }

    static async order(req, res) {
        const totalPrice = (await ordersService.getById(req.params.orderId))[0];
        const order = await linksOrdersProductsService.getByOrderId(req.params.orderId);
        const products = await deliverysService.getInStorageByDateProductId();
        res.render('order', {
            title: 'Greetings form Handlebars',
            data: {order: order, products: products, ...totalPrice}
        })
    }

    static async createOrder(req, res) {
        await ordersService.create(req.body.client_id);
        res.redirect('back')
    }

    static async deleteOrder(req, res) {
        await ordersService.delete(req.params.orderId);
        res.redirect('back')
    }

    static async createLinksOrdersProducts(req, res) {
        try {
            const deliveryId = (await deliverysService.getProductNameAndProductPrice(req.body.deliverys_product_id))[0];
            await linksOrdersProductsService.create(req.params.orderId, req.body.count, req.body.deliverys_product_id, deliveryId.products_name, deliveryId.products_price);
        } catch (e) {

        }
        res.redirect('back')
    }

    static async updateLinksOrdersProducts(req, res) {
        try {
            const deliveryId = (await deliverysService.getProductNameAndProductPrice(req.body.deliverys_product_id))[0];
            await linksOrdersProductsService.update(req.params.linksOrdersProducts, req.body.count, req.body.deliverys_product_id, deliveryId.products_name, deliveryId.products_price);
        } catch (e) {

        }
        res.redirect('back')
    }

    static async deleteLinksOrdersProducts(req, res) {
        await linksOrdersProductsService.delete(req.params.linksOrdersProducts);
        res.redirect('back')
    }
}

module.exports = OrdersController;
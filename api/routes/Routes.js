'use strict';
module.exports = function (app) {
    const suppliersController = require("../controllers/SuppliersController");
    const productsController = require("../controllers/ProductsController");
    const clientController = require("../controllers/ClientsController");
    const SalesController = require("../controllers/SalesController");
    const preOrdersController = require("../controllers/PreOrdersController");
    const storageController = require("../controllers/StorageController");
    const ordersController = require("../controllers/OrdersController");

    app.route('/suppliers')
        .get(suppliersController.listAllSuppliers);

    app.route('/products')
        .get(suppliersController.getSuppliersAndDeliveryTimeByProduct);

    app.route('/suppliers/top-10')
        .get(suppliersController.getTopSuppliers);

    app.route('/suppliers/profit')
        .get(suppliersController.getProfit);

    app.route('/products/defective')
        .get(productsController.getDefectedDeliveryByProducts);

    app.route('/sales/top-10')
        .get(productsController.getTopProducts);

    app.route('/sales/average')
        .get(productsController.getAverageSale);

    app.route('/products/by_day')
        .get(productsController.getSelProductsByDay);

    app.route('/sales')
        .get(SalesController.get);

    app.route('/pre-orders')
        .get(preOrdersController.getAll);

    app.route('/storage')
        .get(storageController.getAll);

    app.route('/storage/free_spaces')
        .get(storageController.getFreeCells);

    app.route('/clients')
        .get(clientController.clientAndCount);

    app.route('/orders_log')
        .get(ordersController.log);
    app.route('/orders')
        .get(ordersController.orders)
        .post(ordersController.createOrder);

    app.route('/order/delete/:orderId')
        .get(ordersController.deleteOrder);

    app.route('/order/:orderId')
        .get(ordersController.order)
        .post(ordersController.createLinksOrdersProducts);

    app.route('/links-orders-products/update/:linksOrdersProducts')
        .post(ordersController.updateLinksOrdersProducts);

    app.route('/links-orders-products/delete/:linksOrdersProducts')
        .post(ordersController.deleteLinksOrdersProducts);
};
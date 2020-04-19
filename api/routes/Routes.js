'use strict';
module.exports = function(app) {
    const todoList = require('../controllers/todoListController');
    const suppliersController = require("../controllers/SuppliersController");
    const productsController = require("../controllers/ProductsController");
    const clientController = require("../controllers/ClientsController");
    const cashReportController = require("../controllers/CashReportController");
    const preOrdersController = require("../controllers/PreOrdersController");

    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/suppliers')
        .get(suppliersController.listAllSuppliers);

    app.route('/suppliers/delivery_time')
        .get(suppliersController.getSuppliersAndDeliveryTimeByProduct);

    app.route('/suppliers/top_10')
        .get(suppliersController.getTopSuppliers);

    app.route('/suppliers/profit')
        .get(suppliersController.getProfit);

    app.route('/products/delivery_defective')
        .get(productsController.getDefectedDeliveryByProducts);

    app.route('/products/top_10')
        .get(productsController.getTopProducts);

    app.route('/products/average_sale')
        .get(productsController.getAverageSale);

    app.route('/products/average_sale')
        .get(productsController.getAverageSale);

    app.route('/products/by_day')
        .get(productsController.getSelProductsByDay);

    app.route('/cash_report')
        .get(cashReportController.get);

    app.route('/pre_orders')
        .get(preOrdersController.all);

    app.route('/clients/client_and_count')
        .get(clientController.clientAndCount);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};
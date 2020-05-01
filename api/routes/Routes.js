'use strict';
module.exports = function (app) {
    const todoList = require('../controllers/todoListController');
    const suppliersController = require("../controllers/SuppliersController");
    const productsController = require("../controllers/ProductsController");
    const clientController = require("../controllers/ClientsController");
    const SalesController = require("../controllers/SalesController");
    const preOrdersController = require("../controllers/PreOrdersController");
    const storageController = require("../controllers/StorageController");

    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

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

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};
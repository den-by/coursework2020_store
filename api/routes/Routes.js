'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/todoListController');
    const suppliersController = require("../controllers/SuppliersController");
    const productsController = require("../controllers/ProductsController");
    const clientController = require("../controllers/ClientController");

    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/suppliers')
        .get(suppliersController.listAllSuppliers);

    app.route('/suppliers/delivery_time')
        .get(suppliersController.getSuppliersAndDeliveryTimeByProduct);

    app.route('/suppliers/top_10')
        .get(suppliersController.getTopSuppliers);

    app.route('/products/delivery_defective')
        .get(productsController.getDefectedDeliveryByProducts);

    app.route('/products/top_10')
        .get(productsController.getTopProducts);

    app.route('/products/average_sale')
        .get(productsController.getAverageSale);

    app.route('/clients/client_and_count')
        .get(clientController.clientAndCount);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};
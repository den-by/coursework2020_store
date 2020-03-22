'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/todoListController');
    // var suppliers = require('../controllers/suppliersController2');
    const SuppliersController = require("../controllers/SuppliersController");


    // todoList Routes
    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/suppliers')
        .get(SuppliersController.list_all_suppliers)
        .post(todoList.create_a_task);

    app.route('/suppliers/by_products')
        .get(SuppliersController.suppliers_by_products)
        .post(todoList.create_a_task);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};
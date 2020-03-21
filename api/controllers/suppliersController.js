'use strict';

// const mysql = require("mysql2");
// const pool = mysql.createPool({
//     connectionLimit: 5,
//     host: "localhost",
//     user: "root",
//     database: "course_work",
//     password: ""
// });

var suppliersModel = require('../models/suppliersModel');

exports.list_all_suppliers =  async function (req, res) {
    let data = await suppliersModel.get(req, res);
    // res.send(data);
    // res.render(data);
    // app.get('/', (req, res) => {
        res.render('home', { title: 'Greetings form Handlebars', 'data': data})
    // })

    // pool.query("SELECT * FROM supplier", function (err, data) {
    //     console.log(data);
    //     res.send(data);
    //     return data;
    //     // if(err) return console.log(err);
    //     // res.render("index.hbs", {
    //     //     users: data
    //     // });
    // });
    // Task.find({}, function(err, task) {
    //     if (err)
    //         res.send(err);
    //     res.json(task);
    // });
};


exports.create_a_task = function (req, res) {
    var new_task = new Task(req.body);
    new_task.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_task = function (req, res) {
    Task.findById(req.params.taskId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_task = function (req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function (req, res) {


    Task.remove({
        _id: req.params.taskId
    }, function (err, task) {
        if (err)
            res.send(err);
        res.json({message: 'Task successfully deleted'});
    });
};

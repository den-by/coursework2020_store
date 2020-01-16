var express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    Task = require('./api/models/todoListModel'), //created model loading here
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mysql = require("mysql2/promise");
global.pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "course_work",
    password: ""
});


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
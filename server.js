var express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    Task = require('./api/models/todoListModel'), //created model loading here
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Credential","true");

    next();
});


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


var cors = require('cors')

app.use(cors())

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
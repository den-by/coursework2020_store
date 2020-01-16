exports.get = function(req, res) {
    pool.query("SELECT * FROM supplier", function(err, data) {
        console.log(data);
        res.send(data);
        return data;
        // if(err) return console.log(err);
        // res.render("index.hbs", {
        //     users: data
        // });
    });
    // Task.find({}, function(err, task) {
    //     if (err)
    //         res.send(err);
    //     res.json(task);
    // });
};
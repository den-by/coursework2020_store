exports.get = async function(id) {

   const  data = await pool.query("SELECT * FROM supplier");
   return data[0];
    // res.send(data);
    // return data2;
    // Task.find({}, function(err, task) {
    //     if (err)
    //         res.send(err);
    //     res.json(task);
    // });
};
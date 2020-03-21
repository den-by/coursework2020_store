const TABLE_NAME = 'supplier';
const SUPPLIER_TYPE_ID = 'supplier_type_id';

exports.get = async function (req) {
    let minValue = req.query.minValue;
    let productId = req.query.productId;
    let startData = req.query.startData;
    let minData = req.query.minData;
    // req.param.asd;


    let sql = `SELECT * FROM ${TABLE_NAME}`;
    let where = [];
    if (req.query[SUPPLIER_TYPE_ID]) where.push(`${TABLE_NAME}.${SUPPLIER_TYPE_ID}`);
    if (where.length>0) sql += ` where ${where}`;
    const data = await pool.query(sql);
    return data[0];
    // res.send(data);
    // return data2;
    // Task.find({}, function(err, task) {
    //     if (err)
    //         res.send(err);
    //     res.json(task);
    // });
};
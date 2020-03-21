var suppliersModel = require('../models/TestClass');

class TestClass extends require('../controllers/mainClass'){

    static async list_all_suppliers(req, res) {
        var a=0;
         let data = await suppliersModel.get(req, res);
         res.render('home', {title: 'Greetings form Handlebars', 'data': data})
    }
}

module.exports = TestClass;
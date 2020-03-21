
module.exports =  {
    inc: function (value, options) {
        return parseInt(value) + 1;
    },
    foo: function (var1, var2) {
        return 'fg'
    },
    json: function (context) {
        return JSON.stringify(context);
    }

};

module.exports =  {
    inc: function (value, options) {
        return parseInt(value) + 1;
    },
    eq: function (a, b, opts) {
        if (a == b) {
            return true;
        } else {
            return false;
        }
    },
    json: function (context) {
        return JSON.stringify(context);
    }

};
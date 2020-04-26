module.exports = {
    inc: function (value, options) {
        return parseInt(value) + 1;
    },
    eq: function (a, b, opts) {
        return a == b
    },
    json: function (context) {
        return JSON.stringify(context);
    },
    formatDate: function (date) {

        if (!date) {
            return ''
        }
        let dd = date.getDate();
        if (dd < 10) {
            dd = '0' + dd
        }

        let mm = date.getMonth() + 1;
        if (mm < 10) {
            mm = '0' + mm
        }

        let yy = date.getFullYear() % 100;
        if (yy < 10) {
            yy = '0' + yy
        }

        return dd + '.' + mm + '.' + yy;
    }

};
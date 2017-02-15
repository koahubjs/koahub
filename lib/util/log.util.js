'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = log;
exports.debug = debug;
exports.http = http;

var _time = require('./time.util');

function log(log) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';


    if (typeof log == 'string') {
        console[type]('[' + (0, _time.dateFormat)(new Date(), 'yyyy-MM-dd hh:mm:ss') + '] [Koahub] ' + log);
    } else {
        console[type](log);
    }
}

function debug(err) {

    if (process.env.NODE_ENV !== 'production') {
        log(err);
    } else {
        log(err.message);
    }
}

function http(err) {

    if (process.env.NODE_ENV !== 'production') {
        log(err);
    } else {
        log(err.message);
    }
}
//# sourceMappingURL=log.util.js.map
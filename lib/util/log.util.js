"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = log;
exports.watch = watch;
exports.debug = debug;
exports.http = http;

var _safe = require("colors/safe");

var _safe2 = _interopRequireDefault(_safe);

var _time = require("./time.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function log(log) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';

    if (typeof log == 'string') {
        console[type]("[" + (0, _time.dateFormat)(new Date(), 'yyyy-MM-dd hh:mm:ss') + "] [Koahubjs] " + log);
    } else {
        console[type](log);
    }
}

function watch(path, type) {

    switch (type) {
        case 'add':
            log(_safe2.default.red("[File Add] " + path));
            break;
        case 'change':
            log(_safe2.default.red("[File Changed] " + path));
            break;
        case 'unlink':
            log(_safe2.default.red("[File Unlink] " + path));
            break;
    }
}

function debug(err) {

    if (process.env.NODE_ENV !== 'production') {
        log(err, 'error');
    } else {
        log(err.message);
    }
}

function http(err) {

    if (process.env.NODE_ENV !== 'production') {
        log(err, 'error');
    } else {
        log(err.message);
    }
}
//# sourceMappingURL=log.util.js.map
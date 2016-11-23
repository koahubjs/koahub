"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.debug = debug;
exports.http = http;
exports.watch = watch;

var _safe = require("colors/safe");

var _safe2 = _interopRequireDefault(_safe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function debug(err) {

    if (koahub.configs.index.debug) {
        console.error(err);
    } else {
        console.log(err.message);
    }
}

function http(err) {
    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 404;


    if (koahub.configs.index.debug) {
        koahub.ctx.throw(err, code);
    } else {
        console.log(err);
    }
}

function watch(path) {

    console.log(_safe2.default.green('[File Changed Server Restart] %s'), path);
}
//# sourceMappingURL=log.util.js.map
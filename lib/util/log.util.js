'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.debug = debug;
exports.http = http;
exports.watch = watch;

var _safe = require('colors/safe');

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

    if (koahub.configs.index.debug) {
        console.error(err);
    } else {
        console.log(err);
    }
}

function watch(path, type) {

    switch (type) {
        case 'add':
            console.log(_safe2.default.green('[File Add Server Restart] %s'), path);
            break;
        case 'change':
            console.log(_safe2.default.green('[File Changed Server Restart] %s'), path);
            break;
        case 'unlink':
            console.log(_safe2.default.green('[File Unlink Server Restart] %s'), path);
            break;
    }
}
//# sourceMappingURL=log.util.js.map
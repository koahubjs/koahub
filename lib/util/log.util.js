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

    if (koahub.config('debug')) {
        koahub.log(err, 'error');
    } else {
        koahub.log(err.message);
    }
}

function http(err) {

    if (koahub.config('debug')) {
        koahub.log(err, 'error');
    } else {
        koahub.log(err.message);
    }
}

function watch(path, type) {

    switch (type) {
        case 'add':
            koahub.log(_safe2.default.red('[File Add] ' + path));
            break;
        case 'change':
            koahub.log(_safe2.default.red('[File Changed] ' + path));
            break;
        case 'unlink':
            koahub.log(_safe2.default.red('[File Unlink] ' + path));
            break;
    }
}
//# sourceMappingURL=log.util.js.map
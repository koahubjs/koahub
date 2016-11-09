"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (err) {

    if (koahub.configs.index.debug) {
        console.error(err);
    } else {
        console.log(err.message);
    }
};

exports.http = http;
function http(err) {
    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 404;


    if (koahub.configs.index.debug) {
        ctx.throw(err, code);
    } else {
        console.log(err);
    }
}
//# sourceMappingURL=debug.util.js.map
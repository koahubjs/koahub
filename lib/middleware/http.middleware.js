"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.httpMiddleware = httpMiddleware;

var _skip = require("./skip.middleware");

var _skip2 = _interopRequireDefault(_skip);

var _http = require("./../util/http.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// run http
function httpMiddleware() {

    var http = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return (0, _http.runAction)(ctx.path);

                        case 2:
                            _context.next = 4;
                            return next();

                        case 4:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function http(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();

    http.skip = _skip2.default;

    return http;
}
//# sourceMappingURL=http.middleware.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = httpMiddleware;

var _url = require("url");

var _pathToRegexp = require("path-to-regexp");

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _skip = require("./skip.middleware");

var _skip2 = _interopRequireDefault(_skip);

var _log = require("./../util/log.util");

var _log2 = _interopRequireDefault(_log);

var _http = require("./../util/http.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function httpMiddleware() {

    var http = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var routers, regexp, regres, index, url, path, method, params, router, keys, key, _router, routerMethod;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            routers = koahub.configs.router;
                            regexp = void 0, regres = void 0, index = void 0, url = void 0, path = void 0, method = ctx.method, params = [];

                            if (!(routers && routers.length)) {
                                _context.next = 38;
                                break;
                            }

                            _context.t0 = _regenerator2.default.keys(routers);

                        case 4:
                            if ((_context.t1 = _context.t0()).done) {
                                _context.next = 15;
                                break;
                            }

                            router = _context.t1.value;
                            keys = [];

                            regexp = (0, _pathToRegexp2.default)(routers[router][0], keys, { strict: true, sensitive: true });
                            regres = regexp.exec(ctx.path);

                            if (!regres) {
                                _context.next = 13;
                                break;
                            }

                            for (key in keys) {
                                params[keys[key].name] = regres[parseInt(key) + 1];
                            }
                            index = router;
                            return _context.abrupt("break", 15);

                        case 13:
                            _context.next = 4;
                            break;

                        case 15:
                            if (!index) {
                                _context.next = 34;
                                break;
                            }

                            _router = routers[index][1];

                            if (!_lodash2.default.isString(_router)) {
                                _context.next = 22;
                                break;
                            }

                            path = _router;
                            url = _router + (0, _http.urlObjToParam)((0, _url.parse)(ctx.url).query, params);
                            _context.next = 30;
                            break;

                        case 22:
                            routerMethod = _router[method.toLowerCase()];

                            if (!routerMethod) {
                                _context.next = 28;
                                break;
                            }

                            path = routerMethod;
                            url = routerMethod + (0, _http.urlObjToParam)((0, _url.parse)(ctx.url).query, params);
                            _context.next = 30;
                            break;

                        case 28:
                            (0, _log2.default)('Not Found Router');
                            return _context.abrupt("return");

                        case 30:
                            _context.next = 32;
                            return (0, _http.runAction)((0, _assign2.default)(ctx, { originalPath: ctx.path, path: path, url: url }), next);

                        case 32:
                            _context.next = 36;
                            break;

                        case 34:
                            _context.next = 36;
                            return (0, _http.runAction)(ctx, next);

                        case 36:
                            _context.next = 40;
                            break;

                        case 38:
                            _context.next = 40;
                            return (0, _http.runAction)(ctx, next);

                        case 40:
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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = function (options) {

    options = options || {};

    var defaults = {
        origin: true,
        methods: 'GET,HEAD,PUT,POST,DELETE'
    };

    // Set defaults
    for (var key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }

    // Set expose
    if (Array.isArray(options.expose)) {
        options.expose = options.expose.join(',');
    }

    // Set maxAge
    if (typeof options.maxAge === 'number') {
        options.maxAge = options.maxAge.toString();
    } else {
        options.maxAge = null;
    }

    // Set methods
    if (Array.isArray(options.methods)) {
        options.methods = options.methods.join(',');
    }

    // Set headers
    if (Array.isArray(options.headers)) {
        options.headers = options.headers.join(',');
    }

    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var origin, headers;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:

                            /**
                             * Access Control Allow Origin
                             */
                            origin = void 0;


                            if (typeof options.origin === 'string') {
                                origin = options.origin;
                            } else if (options.origin === true) {
                                origin = ctx.get('origin') || '*';
                            } else if (options.origin === false) {
                                origin = options.origin;
                            } else if (typeof options.origin === 'function') {
                                origin = options.origin(ctx.request);
                            }

                            if (!(origin === false)) {
                                _context.next = 4;
                                break;
                            }

                            return _context.abrupt('return');

                        case 4:

                            ctx.set('Access-Control-Allow-Origin', origin);

                            /**
                             * Access Control Expose Headers
                             */
                            if (options.expose) {
                                ctx.set('Access-Control-Expose-Headers', options.expose);
                            }

                            /**
                             * Access Control Max Age
                             */
                            if (options.maxAge) {
                                ctx.set('Access-Control-Max-Age', options.maxAge);
                            }

                            /**
                             * Access Control Allow Credentials
                             */
                            if (options.credentials === true) {
                                ctx.set('Access-Control-Allow-Credentials', 'true');
                            }

                            /**
                             * Access Control Allow Methods
                             */
                            ctx.set('Access-Control-Allow-Methods', options.methods);

                            /**
                             * Access Control Allow Headers
                             */
                            headers = void 0;


                            if (options.headers) {
                                headers = options.headers;
                            } else {
                                headers = ctx.get('access-control-request-headers');
                            }

                            if (headers) {
                                ctx.set('Access-Control-Allow-Headers', headers);
                            }

                            /**
                             * Returns
                             */

                            if (!(ctx.method === 'OPTIONS')) {
                                _context.next = 16;
                                break;
                            }

                            ctx.status = 204;
                            _context.next = 18;
                            break;

                        case 16:
                            _context.next = 18;
                            return next();

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function cors(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return cors;
    }();
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=cors.middleware.js.map
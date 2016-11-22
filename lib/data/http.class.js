'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class(ctx) {
        (0, _classCallCheck3.default)(this, _class);

        if (ctx == undefined) {
            throw new Error('SyntaxError: missing super(ctx) call in constructor');
            return;
        }
        this.ctx = ctx;
    }

    (0, _createClass3.default)(_class, [{
        key: 'method',
        value: function method() {
            return this.ctx.method;
        }
    }, {
        key: 'isGet',
        value: function isGet() {
            if (this.ctx.method == 'GET') {
                return true;
            }
            return false;
        }
    }, {
        key: 'isPost',
        value: function isPost() {
            if (this.ctx.method == 'POST') {
                return true;
            }
            return false;
        }
    }, {
        key: 'isAjax',
        value: function isAjax() {
            return this.header('X-Requested-With') === 'XMLHttpRequest';
        }
    }, {
        key: 'isPjax',
        value: function isPjax() {
            return this.header('X-PJAX') || false;
        }
    }, {
        key: 'isMethod',
        value: function isMethod(method) {
            return this.ctx.method === method.toUpperCase();
        }
    }, {
        key: 'ip',
        value: function ip() {
            return this.ctx.ip;
        }
    }, {
        key: 'header',
        value: function header(name, value) {
            if (value != undefined) {
                this.ctx.set(name, value);
            } else {
                return this.ctx.get(name);
            }
        }
    }, {
        key: 'status',
        value: function status(code) {
            if (code != undefined) {
                this.ctx.status = code;
            } else {
                return this.ctx.status;
            }
        }
    }, {
        key: 'get',
        value: function get(name) {
            if (name != undefined) {
                return this.ctx.query[name];
            } else {
                return this.ctx.query;
            }
        }
    }, {
        key: 'post',
        value: function post(name) {
            if (name != undefined) {
                return this.ctx.post[name];
            } else {
                return this.ctx.post;
            }
        }
    }, {
        key: 'file',
        value: function file(name) {
            if (name != undefined) {
                return this.ctx.file[name];
            } else {
                return this.ctx.file;
            }
        }
    }, {
        key: 'session',
        value: function session(name, value) {
            if (name != undefined) {
                if (value != undefined) {
                    this.ctx.session[name] = value;
                } else {
                    return this.ctx.session[name];
                }
            } else {
                return this.ctx.session;
            }
        }
    }, {
        key: 'cookie',
        value: function cookie() {
            return {
                get: function get(name, options) {
                    return this.ctx.cookies.get(name, options);
                },
                set: function set(name, value, options) {
                    return this.ctx.cookies.set(name, value, options);
                }
            };
        }
    }, {
        key: 'state',
        value: function state(name, value) {
            if (name != undefined) {
                if (value != undefined) {
                    this.ctx.state[name] = value;
                } else {
                    return this.ctx.state[name];
                }
            } else {
                return this.ctx.state;
            }
        }
    }, {
        key: 'host',
        value: function host() {
            return this.ctx.host;
        }
    }, {
        key: 'redirect',
        value: function redirect(url) {
            this.ctx.redirect(url);
        }
    }, {
        key: 'view',
        value: function view(data) {
            this.ctx.body = data;
        }
    }, {
        key: 'json',
        value: function json(data, msg, code) {

            var body = {};

            if (data != undefined) {
                body.data = data;
            }
            if (msg != undefined) {
                body.msg = msg;
            }
            if (code != undefined) {
                body.code = code;
            }

            this.ctx.body = body;
        }
    }, {
        key: 'render',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(tpl, locals) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.ctx.render(tpl, locals);

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function render(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return render;
        }()
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=http.class.js.map
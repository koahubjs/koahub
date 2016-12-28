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

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _http = require("./../util/http.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class(ctx, next) {
        (0, _classCallCheck3.default)(this, _class);


        if (arguments.length == 0) {
            throw new Error('SyntaxError: missing super(ctx) call in constructor');
            return;
        }
        if (arguments.length == 1) {
            throw new Error('SyntaxError: missing super(next) call in constructor');
            return;
        }
        this.ctx = ctx;
        this.next = next;
    }

    (0, _createClass3.default)(_class, [{
        key: "method",
        value: function method() {
            return this.ctx.method;
        }
    }, {
        key: "isGet",
        value: function isGet() {

            if (this.ctx.method == 'GET') {
                return true;
            }
            return false;
        }
    }, {
        key: "isPost",
        value: function isPost() {

            if (this.ctx.method == 'POST') {
                return true;
            }
            return false;
        }
    }, {
        key: "isAjax",
        value: function isAjax() {
            return this.header('X-Requested-With') === 'XMLHttpRequest';
        }
    }, {
        key: "isPjax",
        value: function isPjax() {
            return this.header('X-PJAX') || false;
        }
    }, {
        key: "isMethod",
        value: function isMethod(method) {
            return this.ctx.method === method.toUpperCase();
        }
    }, {
        key: "ip",
        value: function ip() {
            return this.ctx.ip;
        }
    }, {
        key: "header",
        value: function header(name, value) {

            switch (arguments.length) {
                case 1:
                    return this.ctx.get(name);
                case 2:
                    this.ctx.set(name, value);
            }
        }
    }, {
        key: "status",
        value: function status(code) {

            switch (arguments.length) {
                case 0:
                    return this.ctx.status;
                case 1:
                    this.ctx.status = code;
            }
        }
    }, {
        key: "get",
        value: function get(name, value) {

            switch (arguments.length) {
                case 0:
                    return this.ctx.query;
                case 1:

                    if (name == null) {
                        this.ctx.query = {};
                        break;
                    }
                    return this.ctx.query[name];
                case 2:

                    if (value == null) {
                        delete this.ctx.query[name];
                        break;
                    }
                    this.ctx.query[name] = value;
            }
        }
    }, {
        key: "post",
        value: function post(name, value) {

            switch (arguments.length) {
                case 0:
                    return this.ctx.post;
                case 1:

                    if (name == null) {
                        this.ctx.post = {};
                        break;
                    }
                    return this.ctx.post[name];
                case 2:

                    if (value == null) {
                        delete this.ctx.post[name];
                        break;
                    }
                    this.ctx.post[name] = value;
            }
        }
    }, {
        key: "file",
        value: function file(name, value) {

            switch (arguments.length) {
                case 0:
                    return this.ctx.file;
                case 1:

                    if (name == null) {
                        this.ctx.file = {};
                        break;
                    }
                    return this.ctx.file[name];
                case 2:

                    if (value == null) {
                        delete this.ctx.file[name];
                        break;
                    }
                    this.ctx.file[name] = value;
            }
        }
    }, {
        key: "session",
        value: function session(name, value) {

            switch (arguments.length) {
                case 0:
                    return this.ctx.session;
                case 1:

                    if (name == null) {
                        this.ctx.session = {};
                        break;
                    }
                    return this.ctx.session[name];
                case 2:

                    if (value == null) {
                        delete this.ctx.session[name];
                        break;
                    }
                    this.ctx.session[name] = value;
            }
        }
    }, {
        key: "cookie",
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
        key: "state",
        value: function state(name, value) {

            switch (arguments.length) {
                case 0:
                    return this.ctx.state;
                case 1:

                    if (name == null) {
                        this.ctx.state = {};
                        break;
                    }
                    return this.ctx.state[name];
                case 2:

                    if (value == null) {
                        delete this.ctx.state[name];
                        break;
                    }
                    this.ctx.state[name] = value;
            }
        }
    }, {
        key: "host",
        value: function host() {
            return this.ctx.host;
        }
    }, {
        key: "redirect",
        value: function redirect(url) {
            this.ctx.redirect(url);
        }
    }, {
        key: "download",
        value: function download(file) {

            var filename = _path2.default.relative(_path2.default.dirname(file), file);

            this.header('Content-disposition', 'attachment; filename=' + filename);
            this.view(_fs2.default.createReadStream(file));
        }
    }, {
        key: "action",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _http.runAction.apply(undefined, [(0, _assign2.default)(this.ctx, { path: path }), this.next, false].concat(args));

                            case 2:
                                return _context.abrupt("return", _context.sent);

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function action(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return action;
        }()
    }, {
        key: "view",
        value: function view(data) {
            this.ctx.body = data;
        }
    }, {
        key: "json",
        value: function json(data, msg, code) {

            var body = {};

            switch (arguments.length) {
                case 1:
                    body = {
                        data: data
                    };
                    break;
                case 2:
                    body = {
                        data: data,
                        msg: msg
                    };
                    break;
                case 3:
                    body = {
                        data: data,
                        msg: msg,
                        code: code
                    };
                    break;
            }

            this.ctx.body = body;
        }
    }, {
        key: "render",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(tpl, locals) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.ctx.render(tpl, locals);

                            case 2:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function render(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return render;
        }()
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=http.class.js.map
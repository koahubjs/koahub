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

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

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

var Controller = function () {
    function Controller(ctx, next) {
        var _this = this;

        (0, _classCallCheck3.default)(this, Controller);


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

        if (koahub.config('hook')) {
            this.hook = koahub.hook;
        }

        var _loop = function _loop(name) {
            if (typeof ctx[name] !== 'function') {
                (0, _defineProperty2.default)(_this, name, {
                    configurable: true,
                    enumerable: true,
                    get: function get() {
                        return _this.ctx[name];
                    },
                    set: function set(value) {
                        _this.ctx[name] = value;
                    }
                });
            } else {
                _this[name] = ctx[name];
            }
        };

        for (var name in ctx) {
            _loop(name);
        }
    }

    (0, _createClass3.default)(Controller, [{
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

            this.view(body);
        }
    }, {
        key: "success",
        value: function success(data, msg) {
            this.json(data, msg, 1);
        }
    }, {
        key: "error",
        value: function error(data, msg) {
            this.json(data, msg, 0);
        }
    }, {
        key: "download",
        value: function download(file) {

            var filename = _path2.default.relative(_path2.default.dirname(file), file);

            this.ctx.set('Content-disposition', 'attachment; filename=' + filename);
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
                                return _http.runAction.apply(undefined, [(0, _assign2.default)(this.ctx, { path: path }), this.next].concat(args));

                            case 2:
                                return _context.abrupt("return", _context.sent);

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function action(_x) {
                return _ref.apply(this, arguments);
            }

            return action;
        }()
    }]);
    return Controller;
}();

exports.default = Controller;
//# sourceMappingURL=controller.class.js.map
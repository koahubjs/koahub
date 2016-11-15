"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _http = require("./../util/http.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// hooks 定义 支持http和util
// {
//     hook1: [
//         '/admin/index/index'
//     ]
// }

var _class = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);

        this.hooks = {};
    }

    (0, _createClass3.default)(_class, [{
        key: "get",
        value: function get() {
            return this.hooks;
        }
    }, {
        key: "add",
        value: function add(name, action) {
            var add = true;
            for (var key in this.hooks) {
                if (name == key) {
                    this.hooks[key].push(action);
                    add = false;
                }
            }
            if (add) {
                this.hooks[name] = [action];
            }

            return this.get();
        }
    }, {
        key: "run",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(name) {
                var key, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, path;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.t0 = _regenerator2.default.keys(this.hooks);

                            case 1:
                                if ((_context.t1 = _context.t0()).done) {
                                    _context.next = 36;
                                    break;
                                }

                                key = _context.t1.value;

                                if (!(name == key)) {
                                    _context.next = 34;
                                    break;
                                }

                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 7;
                                _iterator = (0, _getIterator3.default)(this.hooks[key]);

                            case 9:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context.next = 20;
                                    break;
                                }

                                path = _step.value;

                                if (!/\w+\(.*\)$/.test(path)) {
                                    _context.next = 15;
                                    break;
                                }

                                this.runFunction(path);
                                _context.next = 17;
                                break;

                            case 15:
                                _context.next = 17;
                                return this.runAction(path);

                            case 17:
                                _iteratorNormalCompletion = true;
                                _context.next = 9;
                                break;

                            case 20:
                                _context.next = 26;
                                break;

                            case 22:
                                _context.prev = 22;
                                _context.t2 = _context["catch"](7);
                                _didIteratorError = true;
                                _iteratorError = _context.t2;

                            case 26:
                                _context.prev = 26;
                                _context.prev = 27;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 29:
                                _context.prev = 29;

                                if (!_didIteratorError) {
                                    _context.next = 32;
                                    break;
                                }

                                throw _iteratorError;

                            case 32:
                                return _context.finish(29);

                            case 33:
                                return _context.finish(26);

                            case 34:
                                _context.next = 1;
                                break;

                            case 36:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[7, 22, 26, 34], [27,, 29, 33]]);
            }));

            function run(_x) {
                return _ref.apply(this, arguments);
            }

            return run;
        }()
    }, {
        key: "runAction",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return (0, _http.runAction)(path);

                            case 2:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function runAction(_x2) {
                return _ref2.apply(this, arguments);
            }

            return runAction;
        }()
    }, {
        key: "runFunction",
        value: function runFunction(value) {
            eval("koahub.utils." + value);
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=hook.class.js.map
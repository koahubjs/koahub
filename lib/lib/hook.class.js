"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

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

var Hook = function () {
    function Hook(ctx, next) {
        (0, _classCallCheck3.default)(this, Hook);


        this.ctx = ctx;
        this.next = next;

        this.hooks = {};
    }

    (0, _createClass3.default)(Hook, [{
        key: "get",
        value: function get(name) {

            if (name == undefined) {
                return this.hooks;
            } else {
                for (var key in this.hooks) {
                    if (name == key) {
                        return this.hooks[name];
                    }
                }
            }
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
        }
    }, {
        key: "run",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(name) {
                var key,
                    _iteratorNormalCompletion,
                    _didIteratorError,
                    _iteratorError,
                    _iterator,
                    _step,
                    action,
                    args,
                    i,
                    _args = arguments;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.t0 = _regenerator2.default.keys(this.hooks);

                            case 1:
                                if ((_context.t1 = _context.t0()).done) {
                                    _context.next = 38;
                                    break;
                                }

                                key = _context.t1.value;

                                if (!(name == key)) {
                                    _context.next = 36;
                                    break;
                                }

                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 7;
                                _iterator = (0, _getIterator3.default)(this.hooks[key]);

                            case 9:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context.next = 22;
                                    break;
                                }

                                action = _step.value;

                                if (!/(\/\w+)+/.test(action)) {
                                    _context.next = 16;
                                    break;
                                }

                                _context.next = 14;
                                return this.runAction(action);

                            case 14:
                                _context.next = 19;
                                break;

                            case 16:

                                // run functions
                                args = [];

                                for (i = 1; i < _args.length; i++) {
                                    args.push(_args[i]);
                                }
                                action.apply(this, args);

                            case 19:
                                _iteratorNormalCompletion = true;
                                _context.next = 9;
                                break;

                            case 22:
                                _context.next = 28;
                                break;

                            case 24:
                                _context.prev = 24;
                                _context.t2 = _context["catch"](7);
                                _didIteratorError = true;
                                _iteratorError = _context.t2;

                            case 28:
                                _context.prev = 28;
                                _context.prev = 29;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 31:
                                _context.prev = 31;

                                if (!_didIteratorError) {
                                    _context.next = 34;
                                    break;
                                }

                                throw _iteratorError;

                            case 34:
                                return _context.finish(31);

                            case 35:
                                return _context.finish(28);

                            case 36:
                                _context.next = 1;
                                break;

                            case 38:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[7, 24, 28, 36], [29,, 31, 35]]);
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
                                return (0, _http.runAction)((0, _assign2.default)(this.ctx, { path: path }), this.next);

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
    }]);
    return Hook;
}();

exports.default = Hook;
//# sourceMappingURL=hook.class.js.map
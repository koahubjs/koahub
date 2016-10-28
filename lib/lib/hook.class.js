"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _default = require("./../util/default.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// hooks 定义
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
        value: function run(name) {
            for (var key in this.hooks) {
                if (name == key) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = (0, _getIterator3.default)(this.hooks[key]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var path = _step.value;

                            if (/\w+\(.*\)$/.test(path)) {
                                this.runFunction(path);
                            } else {
                                this.runAction(path);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: "runAction",
        value: function runAction(path) {
            (0, _default.runAction)(path);
        }
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
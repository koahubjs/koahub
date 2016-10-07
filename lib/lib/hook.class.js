'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// hooks 定义
// {
//     addOrder: [
//         '/admin/index/index'
//     ]
// }

var _class = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);

        this.hooks = {};
    }

    (0, _createClass3.default)(_class, [{
        key: 'get',
        value: function get() {
            return this.hooks;
        }
    }, {
        key: 'add',
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
        key: 'run',
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
                                this.runController(path);
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
        key: 'runController',
        value: function runController(path) {
            var action = path.slice(path.lastIndexOf('/'));
            path = path.slice(0, path.lastIndexOf('/'));

            var include = false;
            for (var _key in koahub.controllers) {
                if (_key == path) {
                    include = true;
                    break;
                }
            }

            if (include) {
                var ctrl = koahub.controllers[path];
                var pros = (0, _getOwnPropertyNames2.default)(ctrl.prototype).filter(function (value) {
                    if (value == 'constructor') {
                        return false;
                    }
                    return true;
                });

                var callFlag = true;
                for (var k in pros) {
                    if ('/' + pros[k] == action) {
                        (0, _getPrototypeOf2.default)(new ctrl())[pros[k]].call(this);
                        callFlag = false;
                    }
                }

                if (callFlag) {
                    console.error('Hook Not Found Method');
                }
            } else {
                console.error('Hook Not Found Controller');
            }
        }
    }, {
        key: 'runFunction',
        value: function runFunction(value) {
            eval('koahub.utils.' + value);
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=hook.class.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _path2 = require("path");

var _path3 = _interopRequireDefault(_path2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class(options) {
        (0, _classCallCheck3.default)(this, _class);


        var loaders = [];

        if (options instanceof Array) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(options), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var option = _step.value;

                    loaders = this.concat(loaders, this.loader(option));
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
        } else {
            loaders = this.loader(options);
        }

        return loaders;
    }

    (0, _createClass3.default)(_class, [{
        key: "walk",
        value: function walk(dir) {

            dir = _path3.default.resolve(process.cwd(), dir);

            var exist = _fs2.default.existsSync(dir);
            if (!exist) {
                return;
            }

            var files = _fs2.default.readdirSync(dir);
            var list = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(files), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var file = _step2.value;

                    if (_fs2.default.statSync(dir + '/' + file).isDirectory()) {
                        list = list.concat(this.walk(dir + '/' + file));
                    } else {
                        list.push(dir + '/' + file);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return list;
        }
    }, {
        key: "loader",
        value: function loader(options) {

            if (typeof options == 'undefined') {
                options = {};
            }

            var loaders = [];
            if (typeof options.root !== 'string') {
                throw Error('root must be specified');
            }

            options.suffix = options.suffix || '.js';
            options.prefix = options.prefix || '';
            options.filter = options.filter || [];

            var paths = this.walk(options.root);
            if (!paths) {
                return;
            }

            paths.forEach(function (value, index) {
                var _path = _path3.default.relative(options.root, value);
                if (_path.lastIndexOf(options.suffix) != -1) {
                    _path = _path.slice(0, _path.lastIndexOf(options.suffix));

                    options.filter.forEach(function (v, i) {
                        _path = _path.replace(v, '');
                    });

                    _path = options.prefix + _path;

                    var lib = require(value);
                    if (lib.hasOwnProperty('default') && (0, _keys2.default)(lib).length == 1) {
                        loaders[_path] = lib.default;
                    } else {
                        loaders[_path] = lib;
                    }
                }
            });

            return loaders;
        }
    }, {
        key: "concat",
        value: function concat(arr1, arr2) {

            var arr = arr1;

            for (var key in arr2) {
                arr[key] = arr2[key];
            }

            return arr;
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=loader.class.js.map
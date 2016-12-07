"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _chokidar = require("chokidar");

var _chokidar2 = _interopRequireDefault(_chokidar);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _path2 = require("path");

var _path3 = _interopRequireDefault(_path2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _ = require("./../");

var _2 = _interopRequireDefault(_);

var _log = require("./../util/log.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {

    // 监控 loader自动加载的文件
    function _class(paths) {
        var _this = this;

        (0, _classCallCheck3.default)(this, _class);


        var watcherPaths = [];
        for (var key in koahub.config('loader')) {
            // 移除configs文件监控
            if (key == 'configs') {
                continue;
            }
            var loader = koahub.config('loader')[key];
            if (_lodash2.default.isArray(loader)) {
                for (var _key in loader) {
                    var root = loader[_key].root;
                    watcherPaths.push(root.replace(paths.runtimeName + "/", paths.appName + "/"));
                }
            } else {
                var _root = loader.root;
                watcherPaths.push(_root.replace(paths.runtimeName + "/", paths.appName + "/"));
            }
        }
        watcherPaths = _lodash2.default.union(watcherPaths);

        var watcher = _chokidar2.default.watch(watcherPaths, {
            ignored: /[\/\\]\./,
            persistent: true
        });

        watcher.on('add', function (_path, stats) {

            var runtimePath = _path.replace(paths.appName + "/", paths.runtimeName + "/");

            // 新增文件stats undefined
            if (stats == undefined) {
                (0, _log.watch)(_path, 'add');
                _this.restart();
            }
        });

        watcher.on('change', function (_path, stats) {

            var runtimePath = _path.replace(paths.appName + "/", paths.runtimeName + "/");

            (0, _log.watch)(_path, 'change');
            _this.clear(runtimePath);
        });

        watcher.on('unlink', function (_path, stats) {

            var runtimePath = _path.replace(paths.appName + "/", paths.runtimeName + "/");

            _fs2.default.unlink(runtimePath, function () {
                (0, _log.watch)(_path, 'unlink');
                _this.clear(runtimePath);
            });
        });
    }

    (0, _createClass3.default)(_class, [{
        key: "clear",
        value: function clear(file) {

            if (!_path3.default.isAbsolute(file)) {
                file = _path3.default.resolve(koahub.paths.rootPath, file);
            }

            if (typeof file !== 'string') {
                throw new TypeError('Expected a string');
            }

            // delete itself from module parent
            if (require.cache[file] && require.cache[file].parent) {
                var mods = require.cache[file].parent.children;
                for (var key in mods) {
                    if (mods[key].id === file) {
                        delete mods[key];
                    }
                }
            }

            // delete module from cache
            delete require.cache[file];

            this.restart();
        }
    }, {
        key: "restart",
        value: function restart() {

            // babel compile延时
            setTimeout(function () {
                new _2.default();
            }, 200);
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=watcher.class.js.map
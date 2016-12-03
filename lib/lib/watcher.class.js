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

var _path2 = require("path");

var _path3 = _interopRequireDefault(_path2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _cluster = require("cluster");

var _cluster2 = _interopRequireDefault(_cluster);

var _log = require("./../util/log.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class() {
        var _this = this;

        var paths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, _class);


        var watcher = _chokidar2.default.watch(paths.appPath, {
            ignored: /[\/\\]\./,
            persistent: true
        });

        watcher.on('add', function (_path, stats) {

            var relativePath = _path3.default.relative(paths.rootPath, _path);
            var runtimePath = _path.replace("/" + paths.appName + "/", "/" + paths.runtimeName + "/");

            // 新增文件stats undefined
            if (stats == undefined) {
                (0, _log.watch)(relativePath, 'add');

                _this.restart();
            }
        });

        watcher.on('change', function (_path, stats) {

            var relativePath = _path3.default.relative(paths.rootPath, _path);
            var runtimePath = _path.replace("/" + paths.appName + "/", "/" + paths.runtimeName + "/");

            (0, _log.watch)(relativePath, 'change');
            _this.restart();
        });

        watcher.on('unlink', function (_path, stats) {

            var relativePath = _path3.default.relative(paths.rootPath, _path);
            var runtimePath = _path.replace("/" + paths.appName + "/", "/" + paths.runtimeName + "/");

            _fs2.default.unlink(runtimePath, function () {

                (0, _log.watch)(relativePath, 'unlink');
                _this.restart();
            });
        });
    }

    (0, _createClass3.default)(_class, [{
        key: "restart",
        value: function restart() {

            for (var id in _cluster2.default.workers) {
                _cluster2.default.workers[id].kill();
            }
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=watcher.class.js.map
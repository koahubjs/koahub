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

var _decache = require("decache");

var _decache2 = _interopRequireDefault(_decache);

var _path2 = require("path");

var _path3 = _interopRequireDefault(_path2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _cluster = require("cluster");

var _cluster2 = _interopRequireDefault(_cluster);

var _ = require("./../");

var _2 = _interopRequireDefault(_);

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
        }).unwatch(paths.runtimeFile); // 移除启动主文件监控

        // 移除启动文件依赖监控
        var children = require.cache[paths.runtimeFile].children;
        var regExp = new RegExp("/" + paths.runtimeName + "/");
        for (var key in children) {
            if (regExp.test(children[key].id)) {
                watcher.unwatch(children[key].id);
            }
        }

        watcher.on('add', function (_path, stats) {

            var relativePath = _path3.default.relative(paths.rootPath, _path);
            var runtimePath = _path.replace("/" + paths.appName + "/", "/" + paths.runtimeName + "/");

            // 新增文件stats undefined
            if (stats == undefined) {
                (0, _log.watch)(relativePath, 'add');

                _this.restart();
                _this.masterSend('add');
            }
        });

        watcher.on('change', function (_path, stats) {

            var relativePath = _path3.default.relative(paths.rootPath, _path);
            var runtimePath = _path.replace("/" + paths.appName + "/", "/" + paths.runtimeName + "/");

            (0, _log.watch)(relativePath, 'change');

            (0, _decache2.default)(runtimePath);

            _this.restart();
            _this.masterSend('change', runtimePath);
        });

        watcher.on('unlink', function (_path, stats) {

            var relativePath = _path3.default.relative(paths.rootPath, _path);
            var runtimePath = _path.replace("/" + paths.appName + "/", "/" + paths.runtimeName + "/");

            (0, _decache2.default)(runtimePath);

            _fs2.default.unlink(runtimePath, function () {
                (0, _log.watch)(relativePath, 'unlink');

                _this.restart();
                _this.masterSend('unlink', runtimePath);
            });
        });
    }

    // master线程通知子线程


    (0, _createClass3.default)(_class, [{
        key: "masterSend",
        value: function masterSend(type, file) {
            if (koahub.config('cluster')) {
                for (var id in _cluster2.default.workers) {
                    _cluster2.default.workers[id].send({ name: 'file', type: type, file: file });
                }
            }
        }

        // worker线程收到消息通知

    }, {
        key: "restart",
        value: function restart() {

            setTimeout(function () {
                new _2.default();
            }, 600);
        }
    }], [{
        key: "workerGet",
        value: function workerGet(msg) {
            if (msg.type == 'change') {
                (0, _decache2.default)(msg.file);
            }

            if (msg.type == 'add') {}

            if (msg.type == 'unlink') {
                (0, _decache2.default)(msg.file);
            }

            setTimeout(function () {
                new _2.default();
            }, 600);
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=watcher.class.js.map
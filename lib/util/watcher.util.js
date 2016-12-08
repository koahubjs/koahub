"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = watcher;

var _chokidar = require("chokidar");

var _chokidar2 = _interopRequireDefault(_chokidar);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _log = require("./../util/log.util");

var _index = require("./../config/index.config");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function watcher(callback) {

    var watcher = _chokidar2.default.watch(_index2.default.app, {
        ignored: /[\/\\]\./,
        persistent: true
    });

    watcher.on('add', function (file, stats) {

        // 新增文件stats undefined
        if (stats == undefined) {
            (0, _log.watch)(file, 'add');
            callback(file);
        }
    });

    watcher.on('change', function (file, stats) {

        (0, _log.watch)(file, 'change');
        callback(file);
    });

    watcher.on('unlink', function (file, stats) {

        var runtimePath = file.replace(_index2.default.appName + "/", _index2.default.runtimeName + "/");

        _fs2.default.unlink(runtimePath, function () {
            (0, _log.watch)(file, 'unlink');
            callback(file);
        });
    });
}
//# sourceMappingURL=watcher.util.js.map
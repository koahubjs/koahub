"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = watcher;

var _chokidar = require("chokidar");

var _chokidar2 = _interopRequireDefault(_chokidar);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _log = require("./../util/log.util");

var _index = require("./../config/index.config");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mkdirsSync(dirname, mode) {
    if (_fs2.default.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(_path2.default.dirname(dirname), mode)) {
            _fs2.default.mkdirSync(dirname, mode);
            return true;
        }
    }
}

function delDirs(path) {
    var files = [];
    if (_fs2.default.existsSync(path)) {
        files = _fs2.default.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (_fs2.default.statSync(curPath).isDirectory()) {
                // recurse
                delDirs(curPath);
            } else {
                // delete file
                _fs2.default.unlinkSync(curPath);
            }
        });
        _fs2.default.rmdirSync(path);
    }
};

function watcher(callback) {

    var watcher = _chokidar2.default.watch(_index2.default.app, {
        ignored: [/[\/\\]\./, /.html$/, /.txt$/, /.htm/],
        persistent: true,
        ignoreInitial: true
    });

    watcher.on('add', function (filePath, stats) {

        (0, _log.watch)(filePath, 'add');
        callback(filePath);
    });

    watcher.on('change', function (filePath, stats) {

        (0, _log.watch)(filePath, 'change');
        callback(filePath);
    });

    watcher.on('unlink', function (filePath, stats) {

        var runtimePath = filePath.replace(_index2.default.app + "/", _index2.default.runtime + "/");

        try {
            _fs2.default.unlinkSync(runtimePath);
        } catch (err) {
            throw err;
        }

        (0, _log.watch)(filePath, 'unlink');
        callback(filePath, false);
    });

    watcher.on('addDir', function (dirPath) {
        var dirRuntimePath = dirPath.replace(_index2.default.app + "/", _index2.default.runtime + "/");
        mkdirsSync(dirRuntimePath);
    });

    watcher.on('unlinkDir', function (dirPath) {
        var dirRuntimePath = dirPath.replace(_index2.default.app + "/", _index2.default.runtime + "/");
        delDirs(dirRuntimePath);
    });
}
//# sourceMappingURL=watcher.util.js.map
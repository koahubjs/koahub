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

var _ = require("./../");

var _2 = _interopRequireDefault(_);

var _log = require("./../util/log.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class() {
        var paths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, _class);


        var that = this;
        var watcher = _chokidar2.default.watch(paths.appPath, {
            ignored: /[\/\\]\./,
            persistent: true
        });

        this.startTime = new Date();

        watcher.on('add', function (_path, stats) {

            var now = new Date();
            if (now - that.startTime > 600) {
                (0, _log.watch)(_path3.default.relative(paths.rootPath, _path), 'add');

                that.restart();
            } else {
                that.startTime = now;
            }
        });

        watcher.on('change', function (_path, stats) {
            (0, _log.watch)(_path3.default.relative(paths.rootPath, _path), 'change');

            delete require.cache[_path.replace("/" + paths.appName + "/", "/" + paths.runtimeName + "/")];

            that.restart();
        });

        watcher.on('unlink', function (_path, stats) {

            delete require.cache[_path.replace("/" + paths.appName + "/", "/" + paths.runtimeName + "/")];
            _fs2.default.unlink(_path.replace("/" + paths.appName + "/", "/" + paths.runtimeName + "/"), function () {
                (0, _log.watch)(_path3.default.relative(paths.rootPath, _path), 'unlink');

                that.restart();
            });
        });
    }

    (0, _createClass3.default)(_class, [{
        key: "restart",
        value: function restart() {

            setTimeout(function () {
                new _2.default();
            }, 600);
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=watcher.class.js.map
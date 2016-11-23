"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _chokidar = require("chokidar");

var _chokidar2 = _interopRequireDefault(_chokidar);

var _path2 = require("path");

var _path3 = _interopRequireDefault(_path2);

var _ = require("./../");

var _2 = _interopRequireDefault(_);

var _log = require("./../util/log.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function _class() {
    var paths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, _class);


    var watcher = _chokidar2.default.watch(paths.appPath, {
        ignored: /[\/\\]\./,
        persistent: true
    });

    watcher.on('change', function (_path, stats) {

        (0, _log.watch)(_path3.default.relative(paths.rootPath, _path));

        watcher.close();

        delete require.cache[_path.replace("/" + paths.appName + "/", "/" + paths.runtimeName + "/")];

        setTimeout(function () {
            new _2.default();
        }, 200);
    });
};

exports.default = _class;
//# sourceMappingURL=watcher.class.js.map
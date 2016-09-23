"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);

        this.loadPaths();
    }

    (0, _createClass3.default)(_class, [{
        key: "loadPaths",
        value: function loadPaths() {

            if (global.koahub == undefined) {
                global.koahub = {};
            }

            var mainFile = process.argv[1];
            var mainPath = _path2.default.dirname(mainFile);
            var projectPath = process.cwd();
            var appName = _path2.default.relative(projectPath, _path2.default.dirname(mainFile));
            var appPath = _path2.default.dirname(mainFile);

            koahub.paths = {
                mainFile: mainFile,
                mainPath: mainPath,
                appName: appName,
                appPath: appPath
            };

            console.log(koahub.paths);
        }
    }, {
        key: "loadPath",
        value: function loadPath(path) {
            return path.resolve(koahub.paths.appPath, path);
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=path.class.js.map
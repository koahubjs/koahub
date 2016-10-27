"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require("koa-logger");

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _loader = require("./lib/loader.class");

var _loader2 = _interopRequireDefault(_loader);

var _http3 = require("./data/http.class");

var _http4 = _interopRequireDefault(_http3);

var _hook = require("./lib/hook.class");

var _hook2 = _interopRequireDefault(_hook);

var _default = require("./config/default.config");

var _default2 = _interopRequireDefault(_default);

var _default3 = require("./util/default.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);


        if (global.koahub == undefined) {
            // 加载全局变量
            global.koahub = {};
        }

        this.loadPaths(_default2.default.app_path);

        // new Koa()
        var app = new _koa2.default();

        koahub.app = app;
    }

    (0, _createClass3.default)(_class, [{
        key: "loadPaths",
        value: function loadPaths(appName) {

            var mainFile = process.argv[1];
            var mainPath = _path2.default.dirname(mainFile);
            var appPath = _path2.default.resolve(mainPath, appName);

            koahub.paths = {
                mainFile: mainFile,
                mainPath: mainPath,
                appName: appName,
                appPath: appPath
            };
        }
    }, {
        key: "loadControllers",
        value: function loadControllers() {
            // controller依赖http
            koahub.http = _http4.default;
            koahub.controllers = new _loader2.default(_default2.default.loader.controller);
        }
    }, {
        key: "loadHooks",
        value: function loadHooks() {
            koahub.hook = new _hook2.default();
        }
    }, {
        key: "loadUtils",
        value: function loadUtils() {
            koahub.utils = new _loader2.default(_default2.default.loader.util);
        }
    }, {
        key: "loadModels",
        value: function loadModels() {
            koahub.models = new _loader2.default(_default2.default.loader.model);
        }
    }, {
        key: "loadConfigs",
        value: function loadConfigs() {
            koahub.configs = new _loader2.default(_default2.default.loader.config);
            koahub.configs.default = (0, _assign2.default)(_default2.default, koahub.configs.default);
        }
    }, {
        key: "loadMiddlewares",
        value: function loadMiddlewares() {
            if (koahub.configs.default.log_on) {
                koahub.app.use((0, _koaLogger2.default)());
            }
        }
    }, {
        key: "init",
        value: function init() {
            this.loadControllers();
            this.loadModels();
            this.loadUtils();
            this.loadConfigs();
            this.loadHooks();
            this.loadMiddlewares();

            koahub.app.use(function (ctx, next) {

                koahub.ctx = ctx;

                // 快捷方法
                global.ctx = ctx;

                (0, _default3.runAction)(ctx.path);
            });
        }

        // 支持soket.io

    }, {
        key: "getServer",
        value: function getServer() {
            var server = _http2.default.Server(koahub.app.callback());
            return this.server = server;
        }

        // 支持自定义中间件

    }, {
        key: "getKoa",
        value: function getKoa() {
            return koahub.app;
        }
    }, {
        key: "run",
        value: function run() {
            var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _default2.default.port;


            this.init();

            if (this.server) {
                this.server.listen(port);
            } else {
                this.getServer().listen(port);
            }

            console.log("server running at http://127.0.0.1:" + port);
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=index.js.map
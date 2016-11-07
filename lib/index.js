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

var _package = require("./../package.json");

var _package2 = _interopRequireDefault(_package);

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require("koa-logger");

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaFavicon = require("koa-favicon");

var _koaFavicon2 = _interopRequireDefault(_koaFavicon);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _loader = require("./lib/loader.class");

var _loader2 = _interopRequireDefault(_loader);

var _http3 = require("./data/http.class");

var _http4 = _interopRequireDefault(_http3);

var _hook = require("./lib/hook.class");

var _hook2 = _interopRequireDefault(_hook);

var _index = require("./config/index.config");

var _index2 = _interopRequireDefault(_index);

var _http5 = require("./util/http.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);


        if (global.koahub == undefined) {
            // 加载全局变量
            global.koahub = _lodash2.default.merge({}, _package2.default);
        }

        this.loadPaths(_index2.default.app_path);

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
            koahub.controllers = new _loader2.default(_index2.default.loader.controller);
        }
    }, {
        key: "loadHooks",
        value: function loadHooks() {
            koahub.hook = new _hook2.default();
        }
    }, {
        key: "loadUtils",
        value: function loadUtils() {
            koahub.utils = new _loader2.default(_index2.default.loader.util);
            koahub.utils.lodash = _lodash2.default;
        }
    }, {
        key: "loadModels",
        value: function loadModels() {
            koahub.models = new _loader2.default(_index2.default.loader.model);
        }
    }, {
        key: "loadConfigs",
        value: function loadConfigs() {
            koahub.configs = new _loader2.default(_index2.default.loader.config);
            koahub.configs.index = (0, _assign2.default)(_index2.default, koahub.configs.index);
        }
    }, {
        key: "loadMiddlewares",
        value: function loadMiddlewares() {
            if (koahub.configs.index.log_on) {
                koahub.app.use((0, _koaLogger2.default)());
            }
            koahub.app.use((0, _koaFavicon2.default)(koahub.configs.index.favicon));
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

                (0, _http5.runAction)(ctx.path, true);
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
        value: function run(port) {

            this.init();

            if (!port) {
                port = koahub.configs.index.port;
            }

            if (this.server) {
                this.server.listen(port);
            } else {
                this.getServer().listen(port);
            }

            console.log("[Koahubjs] Koahubjs version: " + koahub.version);
            console.log("[Koahubjs] Koahubjs website: http://js.koahub.com");
            console.log("[Koahubjs] Server running at http://127.0.0.1:" + port);
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=index.js.map
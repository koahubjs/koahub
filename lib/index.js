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

var _koaFavicon = require("koa-favicon");

var _koaFavicon2 = _interopRequireDefault(_koaFavicon);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _safe = require("colors/safe");

var _safe2 = _interopRequireDefault(_safe);

var _package = require("./../package.json");

var _package2 = _interopRequireDefault(_package);

var _loader = require("./lib/loader.class");

var _loader2 = _interopRequireDefault(_loader);

var _hook = require("./lib/hook.class");

var _hook2 = _interopRequireDefault(_hook);

var _http3 = require("./data/http.class");

var _http4 = _interopRequireDefault(_http3);

var _watcher = require("./lib/watcher.class");

var _watcher2 = _interopRequireDefault(_watcher);

var _index = require("./config/index.config");

var _index2 = _interopRequireDefault(_index);

var _default = require("./config/default.config");

var _default2 = _interopRequireDefault(_default);

var _http5 = require("./middleware/http.middleware");

var _log = require("./util/log.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, _class);


        // 加载全局变量
        global.koahub = _lodash2.default.merge({}, _package2.default);
        // new Koa()
        koahub.app = new _koa2.default();

        this.init();
    }

    (0, _createClass3.default)(_class, [{
        key: "loadConfigs",
        value: function loadConfigs() {

            koahub.configs = new _loader2.default(_default2.default.loader.config);
            // 优化config
            koahub.config = function (name) {
                if (name == undefined) {
                    return (0, _assign2.default)(_index2.default, koahub.configs.index);
                } else {
                    return (0, _assign2.default)(_index2.default, koahub.configs.index)[name];
                }
            };
        }
    }, {
        key: "loadPaths",
        value: function loadPaths() {

            var rootPath = process.cwd();
            var appName = _default2.default.app;
            var runtime = _default2.default.runtime;
            var appPath = _path2.default.resolve(rootPath, appName);
            var runtimePath = _path2.default.resolve(rootPath, runtime);

            koahub.paths = {
                rootPath: rootPath,
                appName: appName,
                appPath: appPath,
                runtimeName: runtime,
                runtimePath: runtimePath
            };
        }
    }, {
        key: "loadWatcher",
        value: function loadWatcher(paths) {

            // watch依赖config
            if (koahub.config('watch_on')) {
                new _watcher2.default(paths);
            }
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
        key: "loadServices",
        value: function loadServices() {

            koahub.services = new _loader2.default(_default2.default.loader.service);
        }
    }, {
        key: "loadMiddlewares",
        value: function loadMiddlewares() {

            // log middleware
            if (koahub.config('log_on')) {
                koahub.app.use((0, _koaLogger2.default)());
            }

            // favicon middleware
            koahub.app.use((0, _koaFavicon2.default)(koahub.config('favicon')));
        }
    }, {
        key: "init",
        value: function init() {

            this.loadConfigs();
            this.loadPaths();
            this.loadControllers();
            this.loadModels();
            this.loadServices();
            this.loadUtils();
            this.loadHooks();
            this.loadMiddlewares();
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
        key: "handleError",
        value: function handleError() {

            // 监控错误日志
            koahub.app.on("error", function (err, ctx) {
                (0, _log.debug)(err);
            });

            // 捕获promise reject错误
            process.on('unhandledRejection', function (reason, promise) {
                (0, _log.debug)(reason);
            });

            // 捕获未知错误
            process.on('uncaughtException', function (err) {
                (0, _log.debug)(err);
            });
        }
    }, {
        key: "loadHttpMiddlewares",
        value: function loadHttpMiddlewares() {

            // 加载http中间件
            koahub.app.use((0, _http5.httpMiddleware)().skip(function (ctx) {

                var path = ctx.path;

                // path验证，资源文件跳过中间件
                if (/[^\/]+\.+\w+$/.test(path)) {
                    return true;
                }

                // path验证，无效跳过中间件
                if (/\/\//.test(path)) {
                    return true;
                }

                return false;
            }));
        }
    }, {
        key: "run",
        value: function run(port) {

            this.loadHttpMiddlewares();
            this.handleError();

            if (!port) {
                port = koahub.config('port');
            }

            if (this.server) {
                this.server.listen(port, this.started(port));
            } else {
                this.getServer().listen(port, this.started(port));
            }
        }
    }, {
        key: "started",
        value: function started(port) {

            this.loadWatcher(koahub.paths);

            console.log(_safe2.default.green("[Koahubjs] Koahubjs version: " + koahub.version));
            console.log(_safe2.default.green("[Koahubjs] Koahubjs website: http://js.koahub.com"));
            console.log(_safe2.default.green("[Koahubjs] Server running at http://127.0.0.1:" + port));
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=index.js.map
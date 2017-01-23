"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _koaLogger = require("koa-logger");

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaFavicon = require("koa-favicon");

var _koaFavicon2 = _interopRequireDefault(_koaFavicon);

var _package = require("./../package.json");

var _package2 = _interopRequireDefault(_package);

var _loader = require("./lib/loader.class");

var _loader2 = _interopRequireDefault(_loader);

var _hook = require("./lib/hook.class");

var _hook2 = _interopRequireDefault(_hook);

var _http3 = require("./lib/http.class");

var _http4 = _interopRequireDefault(_http3);

var _index = require("./config/index.config");

var _index2 = _interopRequireDefault(_index);

var _http5 = require("./middleware/http.middleware");

var _log = require("./util/log.util");

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//rewite promise, bluebird is more faster
global.Promise = require('bluebird');
require('babel-runtime/core-js/promise').default = _promise2.default;

var Koahub = function () {
    function Koahub() {
        (0, _classCallCheck3.default)(this, Koahub);


        // 加载全局变量
        global.koahub = _package2.default;
        // new Koa()
        koahub.app = new _koa2.default();

        this.init();
    }

    (0, _createClass3.default)(Koahub, [{
        key: "loadErrors",
        value: function loadErrors() {

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

                if (err.message.indexOf(' EADDRINUSE ') > -1) {
                    process.exit();
                }
            });
        }
    }, {
        key: "loadPaths",
        value: function loadPaths() {

            var rootPath = process.cwd();
            var runtimeFile = process.mainModule.filename;
            var runtimePath = _path2.default.dirname(runtimeFile);
            var runtimeName = _path2.default.relative(rootPath, runtimePath);

            koahub.paths = {
                rootPath: rootPath,
                runtimeFile: runtimeFile,
                runtimePath: runtimePath,
                runtimeName: runtimeName
            };
        }
    }, {
        key: "loadConfigs",
        value: function loadConfigs() {

            // Object.assign({}, config) 创建新对象，不允许覆盖config
            koahub.configs = new _loader2.default(koahub.paths.runtimePath, _index2.default.loader.configs);
            koahub.configs.index = _lodash2.default.merge((0, _assign2.default)({}, _index2.default), koahub.configs.index);
        }
    }, {
        key: "loadUtils",
        value: function loadUtils() {

            // config函数
            koahub.config = function (name, value) {
                if (name == undefined) {
                    return koahub.configs.index;
                } else {
                    if (value == undefined) {
                        return koahub.configs.index[name];
                    } else {
                        koahub.configs.index[name] = value;
                    }
                }
            };

            // controller依赖http
            koahub.http = _http4.default;
        }
    }, {
        key: "loadLoaders",
        value: function loadLoaders() {

            for (var key in koahub.config('loader')) {

                // 移除configs重复加载
                if (key == 'configs') {
                    continue;
                }
                koahub[key] = new _loader2.default(koahub.paths.runtimePath, koahub.config('loader')[key]);
            }

            // 加载模块
            this.loadModules();
        }
    }, {
        key: "loadModules",
        value: function loadModules() {

            var modules = [];
            for (var key in koahub.controllers) {
                var paths = key.split('/');
                if (paths.length < 3) {
                    continue;
                }
                modules.push(paths[1]);
            }
            koahub.modules = _lodash2.default.union(modules);
        }
    }, {
        key: "loadMiddlewares",
        value: function loadMiddlewares() {

            // log middleware
            if (koahub.config('logger')) {
                koahub.app.use((0, _koaLogger2.default)());
            }

            // favicon middleware
            koahub.app.use((0, _koaFavicon2.default)(koahub.config('favicon')));
        }
    }, {
        key: "init",
        value: function init() {

            this.loadErrors();
            this.loadPaths();
            this.loadConfigs();
            this.loadUtils();
            this.loadLoaders();
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
        key: "loadHttpMiddlewares",
        value: function loadHttpMiddlewares() {

            // 加载hook中间件
            if (koahub.config('hook')) {
                koahub.app.use(function () {
                    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
                        return _regenerator2.default.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        koahub.hook = new _hook2.default(ctx, next);
                                        _context.next = 3;
                                        return next();

                                    case 3:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee, this);
                    }));

                    return function (_x, _x2) {
                        return _ref.apply(this, arguments);
                    };
                }());
            }

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

            if (!port) {
                port = koahub.config('port');
            }

            this.start(port);
        }
    }, {
        key: "start",
        value: function start(port) {

            if (this.server) {
                this.server.listen(port);
            } else {
                this.getServer().listen(port);
            }

            this.started(port);
        }
    }, {
        key: "started",
        value: function started(port) {

            (0, _log2.default)("Koahub Version: " + koahub.version);
            (0, _log2.default)("Koahub Website: http://js.koahub.com");
            (0, _log2.default)("Server Enviroment: " + (process.env.NODE_ENV || 'development'));
            (0, _log2.default)("Server running at: http://127.0.0.1:" + port);
        }
    }]);
    return Koahub;
}();

exports.default = Koahub;
//# sourceMappingURL=index.js.map
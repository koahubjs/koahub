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

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _cluster = require("cluster");

var _cluster2 = _interopRequireDefault(_cluster);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require("koa-logger");

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaFavicon = require("koa-favicon");

var _koaFavicon2 = _interopRequireDefault(_koaFavicon);

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

var _time = require("./util/time.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Koahub = function () {
    function Koahub() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, Koahub);


        if (!global.koahub) {
            // 加载全局变量
            global.koahub = _package2.default;
            // new Koa()
            koahub.app = new _koa2.default();

            this.init();
        } else {
            this.init(false);
        }
    }

    (0, _createClass3.default)(Koahub, [{
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
            var mainFile = process.argv[1];
            var appName = _default2.default.app;
            var appPath = _path2.default.resolve(rootPath, appName);
            var runtime = _default2.default.runtime;
            var runtimePath = _path2.default.resolve(rootPath, runtime);

            koahub.paths = {
                rootPath: rootPath,
                mainFile: mainFile,
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
            if (koahub.config('watcher')) {
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
        key: "loadUtils",
        value: function loadUtils() {

            // 自定义loader
            if (koahub.config('loader')) {
                for (var key in koahub.config('loader')) {
                    koahub[key] = new _loader2.default(koahub.config('loader')[key]);
                }
            }
            koahub.log = function (log) {
                var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';

                if (typeof log == 'string') {
                    console[type]("[" + (0, _time.dateFormat)(new Date(), 'yyyy-MM-dd hh:mm:ss') + "] [Koahubjs] " + log);
                } else {
                    console[type](log);
                }
            };
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
            if (koahub.config('logger')) {
                koahub.app.use((0, _koaLogger2.default)());
            }

            // favicon middleware
            koahub.app.use((0, _koaFavicon2.default)(koahub.config('favicon')));
        }
    }, {
        key: "init",
        value: function init() {
            var loadMiddlewares = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


            this.loadConfigs();
            this.loadPaths();
            this.loadControllers();
            this.loadModels();
            this.loadServices();
            this.loadUtils();

            if (loadMiddlewares) {
                this.loadMiddlewares();
            }
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
                if (err.message.indexOf(' EADDRINUSE ') > -1) {
                    process.exit();
                }
            });
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

                    return function (_x4, _x5) {
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
            this.handleError();

            if (!port) {
                port = koahub.config('port');
            }

            if (koahub.config('cluster')) {
                if (_cluster2.default.isMaster) {

                    var numCPUs = _os2.default.cpus().length;
                    for (var i = 0; i < numCPUs; i++) {
                        _cluster2.default.fork();
                    }

                    _cluster2.default.on('exit', function (worker, code, signal) {
                        koahub.log(_safe2.default.red('worker ' + worker.process.pid + ' died'));
                        process.nextTick(function () {
                            _cluster2.default.fork();
                        });
                    });

                    koahub.log(_safe2.default.red('[Tips] In cluster mode, Multiple processes can\'t be Shared memory, Such as session'));

                    this.started(port);
                } else {

                    process.on('message', function (msg) {
                        if (msg.name == 'file') {
                            _watcher2.default.workerGet(msg);
                        }
                    });

                    this.start(port);
                }
            } else {

                this.start(port);
                this.started(port);
            }
        }
    }, {
        key: "start",
        value: function start(port) {

            if (this.server) {
                this.server.listen(port);
            } else {
                this.getServer().listen(port);
            }
        }
    }, {
        key: "started",
        value: function started(port) {

            this.loadWatcher(koahub.paths);

            koahub.log(_safe2.default.green("Koahubjs version: " + koahub.version));
            koahub.log(_safe2.default.green("Koahubjs website: http://js.koahub.com"));
            koahub.log(_safe2.default.green("Server Cluster Status: " + koahub.config('cluster')));
            koahub.log(_safe2.default.green("Server Debug Status: " + koahub.config('debug')));
            koahub.log(_safe2.default.green("Server File Watcher: " + koahub.config('watcher')));
            koahub.log(_safe2.default.green("Server running at http://127.0.0.1:" + port));
        }
    }]);
    return Koahub;
}();

exports.default = Koahub;
//# sourceMappingURL=index.js.map
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

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _koaBody = require("koa-body");

var _koaBody2 = _interopRequireDefault(_koaBody);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _koaConvert = require("koa-convert");

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaLogger = require("koa-logger");

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaFavicon = require("koa-favicon");

var _koaFavicon2 = _interopRequireDefault(_koaFavicon);

var _koaStaticCache = require("koa-static-cache");

var _koaStaticCache2 = _interopRequireDefault(_koaStaticCache);

var _package = require("./../package.json");

var _package2 = _interopRequireDefault(_package);

var _loader = require("./lib/loader.class");

var _loader2 = _interopRequireDefault(_loader);

var _controller = require("./lib/controller.class");

var _controller2 = _interopRequireDefault(_controller);

var _default = require("./config/default.config");

var _default2 = _interopRequireDefault(_default);

var _http3 = require("./middleware/http.middleware");

var _http4 = _interopRequireDefault(_http3);

var _cors = require("./middleware/cors.middleware");

var _cors2 = _interopRequireDefault(_cors);

var _session = require("./middleware/session.middleware");

var _session2 = _interopRequireDefault(_session);

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
            koahub.configs = new _loader2.default(koahub.paths.runtimePath, _default2.default.loader.configs);
            koahub.configs.default = _lodash2.default.merge((0, _assign2.default)({}, _default2.default), koahub.configs.default);
        }
    }, {
        key: "loadUtils",
        value: function loadUtils() {

            // config函数
            koahub.config = function (name, value) {
                if (name == undefined) {
                    return koahub.configs.default;
                } else {
                    if (value == undefined) {
                        return koahub.configs.default[name];
                    } else {
                        koahub.configs.default[name] = value;
                    }
                }
            };

            // controller继承
            koahub.controller = _controller2.default;
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
            if (koahub.config('favicon')) {
                if (_lodash2.default.isString(koahub.config('favicon'))) {
                    koahub.app.use((0, _koaFavicon2.default)(koahub.config('favicon')));
                } else {
                    throw new Error('Favicon must be a string');
                }
            }

            // cors middleware
            if (koahub.config('cors')) {
                if (_lodash2.default.isPlainObject(koahub.config('cors'))) {
                    koahub.app.use((0, _cors2.default)(koahub.config('cors')));
                } else {
                    throw new Error('Cors must be a PlainObject');
                }
            }

            // session middleware
            if (koahub.config('session')) {
                if (_lodash2.default.isPlainObject(koahub.config('session'))) {
                    koahub.app.use((0, _session2.default)(koahub.config('session')));
                } else {
                    throw new Error('Session must be a PlainObject');
                }
            }

            // static middleware
            if (koahub.config('static')) {
                if (_lodash2.default.isPlainObject(koahub.config('static'))) {
                    var _koahub$config = koahub.config('static'),
                        _koahub$config$dir = _koahub$config.dir,
                        dir = _koahub$config$dir === undefined ? '' : _koahub$config$dir,
                        _koahub$config$option = _koahub$config.options,
                        options = _koahub$config$option === undefined ? {} : _koahub$config$option;

                    koahub.app.use((0, _koaConvert2.default)((0, _koaStaticCache2.default)(dir, options)));
                } else {
                    throw new Error('Static must be a PlainObject');
                }
            }
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

            // 加载body中间件
            if (koahub.config('body')) {
                if (_lodash2.default.isPlainObject(koahub.config('body'))) {

                    koahub.app.use((0, _koaBody2.default)(koahub.config('body')));
                    koahub.app.use(function () {
                        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
                            return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!ctx.request.body.files) {
                                                ctx.post = ctx.request.body;
                                            } else {
                                                ctx.post = ctx.request.body.fields;
                                                ctx.file = ctx.request.body.files;
                                            }
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
                } else {
                    throw new Error('Body options must be a PlainObject');
                }
            }

            // 加载http中间件
            koahub.app.use((0, _http4.default)().skip(function (ctx) {

                var path = ctx.path;
                var urlSuffix = koahub.config('url_suffix');

                if (urlSuffix) {
                    var regexp = new RegExp(urlSuffix + "$");
                    if (regexp.test(path)) {
                        ctx.path = path.substr(0, path.lastIndexOf(urlSuffix));
                        return false;
                    }
                    return true;
                }

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
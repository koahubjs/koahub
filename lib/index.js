"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyNames = require("babel-runtime/core-js/object/get-own-property-names");

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _loader = require("./lib/loader.class");

var _loader2 = _interopRequireDefault(_loader);

var _http3 = require("./data/http.class");

var _http4 = _interopRequireDefault(_http3);

var _config = require("./config/config.class");

var _config2 = _interopRequireDefault(_config);

var _hook = require("./lib/hook.class");

var _hook2 = _interopRequireDefault(_hook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class() {
        var appName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'app';
        (0, _classCallCheck3.default)(this, _class);


        if (global.koahub == undefined) {
            // 加载全局变量
            global.koahub = {};
        }

        this.config = _config2.default.loader(appName);

        this.loadPaths(appName);

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
            koahub.controllers = new _loader2.default(this.config.controller);
        }
    }, {
        key: "loadHooks",
        value: function loadHooks() {
            koahub.hook = new _hook2.default();
        }
    }, {
        key: "loadUtils",
        value: function loadUtils() {
            koahub.utils = new _loader2.default(this.config.util);
        }
    }, {
        key: "loadModels",
        value: function loadModels() {
            koahub.models = new _loader2.default(this.config.model);
        }
    }, {
        key: "loadConfigs",
        value: function loadConfigs() {
            koahub.configs = new _loader2.default(this.config.config);
        }
    }, {
        key: "init",
        value: function init() {
            this.loadControllers();
            this.loadModels();
            this.loadUtils();
            this.loadConfigs();
            this.loadHooks();

            koahub.app.use(function (ctx, next) {

                koahub.ctx = ctx;

                // 快捷方法
                global.ctx = ctx;

                var path = ctx.path;
                var action = path.slice(path.lastIndexOf('/'));

                path = path.slice(0, path.lastIndexOf('/'));

                var include = false;
                for (var key in koahub.controllers) {
                    if (key == path) {
                        include = true;
                        break;
                    }
                }

                if (include) {
                    var ctrl = koahub.controllers[path];
                    var pros = (0, _getOwnPropertyNames2.default)(ctrl.prototype).filter(function (value) {
                        if (value == 'constructor') {
                            return false;
                        }
                        return true;
                    });

                    var callFlag = true;
                    for (var k in pros) {
                        if ('/' + pros[k] == action) {
                            (0, _getPrototypeOf2.default)(new ctrl())[pros[k]].call(this);
                            callFlag = false;
                        }
                    }

                    if (callFlag) {
                        ctx.throw(404, 'Not Found Method');
                    }
                } else {
                    ctx.throw(404, 'Not Found Controller');
                }
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
            var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;


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
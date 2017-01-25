import path from "path";
import http from "http";
import Koa from "koa";
import lodash from "lodash";
import logger from "koa-logger";
import favicon from "koa-favicon";
import packageFile from "./../package.json";
import Loader from "./lib/loader.class";
import Hook from "./lib/hook.class";
import Http from "./lib/http.class";
import config from "./config/index.config";
import {httpMiddleware} from "./middleware/http.middleware";
import log, {debug} from "./util/log.util";

//rewite promise, bluebird is more faster
global.Promise = require('bluebird');
require('babel-runtime/core-js/promise').default = Promise;

export default class Koahub {

    constructor() {

        // 加载全局变量
        global.koahub = packageFile;
        // new Koa()
        koahub.app = new Koa();

        this.init();
    }

    loadErrors() {

        // 监控错误日志
        koahub.app.on("error", function (err, ctx) {
            debug(err);
        });

        // 捕获promise reject错误
        process.on('unhandledRejection', function (reason, promise) {
            debug(reason);
        });

        // 捕获未知错误
        process.on('uncaughtException', function (err) {
            debug(err);

            if (err.message.indexOf(' EADDRINUSE ') > -1) {
                process.exit();
            }
        });
    }

    loadPaths() {

        const rootPath = process.cwd();
        const runtimeFile = process.mainModule.filename;
        const runtimePath = path.dirname(runtimeFile);
        const runtimeName = path.relative(rootPath, runtimePath);

        koahub.paths = {
            rootPath: rootPath,
            runtimeFile: runtimeFile,
            runtimePath: runtimePath,
            runtimeName: runtimeName
        };
    }

    loadConfigs() {

        // Object.assign({}, config) 创建新对象，不允许覆盖config
        koahub.configs = new Loader(koahub.paths.runtimePath, config.loader.configs);
        koahub.configs.index = lodash.merge(Object.assign({}, config), koahub.configs.index);
    }

    loadUtils() {

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
        koahub.http = Http;
    }

    loadLoaders() {

        for (let key in koahub.config('loader')) {

            // 移除configs重复加载
            if (key == 'configs') {
                continue;
            }
            koahub[key] = new Loader(koahub.paths.runtimePath, koahub.config('loader')[key]);
        }

        // 加载模块
        this.loadModules();
    }

    loadModules() {

        let modules = [];
        for (let key in koahub.controllers) {
            let paths = key.split('/');
            if (paths.length < 3) {
                continue;
            }
            modules.push(paths[1]);
        }
        koahub.modules = lodash.union(modules);
    }

    loadMiddlewares() {

        // log middleware
        if (koahub.config('logger')) {
            koahub.app.use(logger());
        }

        // favicon middleware
        koahub.app.use(favicon(koahub.config('favicon')));
    }

    init() {

        this.loadErrors();
        this.loadPaths();
        this.loadConfigs();
        this.loadUtils();
        this.loadLoaders();
        this.loadMiddlewares();
    }

    // 支持soket.io
    getServer() {

        const server = http.Server(koahub.app.callback());
        return this.server = server;
    }

    // 支持自定义中间件
    getKoa() {

        return koahub.app;
    }

    loadHttpMiddlewares() {

        // 加载hook中间件
        if (koahub.config('hook')) {
            koahub.app.use(async function (ctx, next) {
                koahub.hook = new Hook(ctx, next);
                await next();
            });
        }

        // 加载http中间件
        koahub.app.use(httpMiddleware().skip(function (ctx) {

            const path = ctx.path;
            const urlSuffix = koahub.config('url_suffix');

            if (urlSuffix) {
                const regexp = new RegExp(`${urlSuffix}$`);
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

    run(port) {

        this.loadHttpMiddlewares();

        if (!port) {
            port = koahub.config('port');
        }

        this.start(port);
    }

    start(port) {

        if (this.server) {
            this.server.listen(port);
        } else {
            this.getServer().listen(port);
        }

        this.started(port);
    }

    started(port) {

        log(`Koahub Version: ${koahub.version}`);
        log(`Koahub Website: http://js.koahub.com`);
        log(`Server Enviroment: ${process.env.NODE_ENV || 'development'}`);
        log(`Server running at: http://127.0.0.1:${port}`);
    }
}
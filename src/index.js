import path from "path";
import http from "http";
import packageFile from "./../package.json";
import Koa from "koa";
import logger from "koa-logger";
import favicon from "koa-favicon";
import lodash from "lodash";
import Loader from "./lib/loader.class";
import Http from "./data/http.class";
import Hook from "./lib/hook.class";
import config from "./config/index.config";
import {httpMiddleware} from "./middleware/http.middleware";
import debug from "./util/debug.util";

export default class {

    constructor() {

        if (global.koahub == undefined) {
            // 加载全局变量
            global.koahub = lodash.merge({}, packageFile);
        }

        // new Koa()
        const app = new Koa();

        koahub.app = app;

        // 加载路径变量
        this.loadPaths(config.app_path);
        // 加载配置文件
        this.loadConfigs();
    }

    loadPaths(appName) {

        let mainFile = process.argv[1];
        let mainPath = path.dirname(mainFile);
        let appPath = path.resolve(mainPath, appName);

        koahub.paths = {
            mainFile: mainFile,
            mainPath: mainPath,
            appName: appName,
            appPath: appPath
        };
    }

    loadControllers() {

        // controller依赖http
        koahub.http = Http;
        koahub.controllers = new Loader(config.loader.controller);
    }

    loadHooks() {

        koahub.hook = new Hook();
    }

    loadUtils() {

        koahub.utils = new Loader(config.loader.util);
        koahub.utils.lodash = lodash;
    }

    loadModels() {

        koahub.models = new Loader(config.loader.model);
    }

    loadConfigs() {

        koahub.configs = new Loader(config.loader.config);
        koahub.configs.index = Object.assign(config, koahub.configs.index);

        // log middleware
        if (koahub.configs.index.log_on) {
            koahub.app.use(logger());
        }

        // favicon middleware
        koahub.app.use(favicon(koahub.configs.index.favicon));
    }

    loadMiddlewares() {

        // 全局ctx快捷方法
        koahub.app.use(async function (ctx, next) {

            koahub.ctx = ctx;

            // 快捷方法
            global.ctx = ctx;

            await next();
        });

        // 加载http中间件
        koahub.app.use(httpMiddleware().skip(function () {

            const path = koahub.ctx.path;
            if (path == '/') {
                return false;
            }

            const paths = path.substr(1, path.length).split('/');
            if (paths[paths.length - 1].indexOf('.') != -1) {
                return true;
            }
            return false;
        }));
    }

    handleError() {

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
        });
    }

    init() {

        this.loadControllers();
        this.loadModels();
        this.loadUtils();
        this.loadHooks();
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

    run(port) {

        this.init();
        this.handleError();

        if (!port) {
            port = koahub.configs.index.port;
        }

        if (this.server) {
            this.server.listen(port);
        } else {
            this.getServer().listen(port);
        }

        console.log(`[Koahubjs] Koahubjs version: ${koahub.version}`);
        console.log(`[Koahubjs] Koahubjs website: http://js.koahub.com`);
        console.log(`[Koahubjs] Server running at http://127.0.0.1:${port}`);
    }
}

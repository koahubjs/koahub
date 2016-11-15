import path from "path";
import http from "http";
import Koa from "koa";
import logger from "koa-logger";
import favicon from "koa-favicon";
import lodash from "lodash";
import packageFile from "./../package.json";
import Loader from "./lib/loader.class";
import Hook from "./lib/hook.class";
import Http from "./data/http.class";
import config from "./config/index.config";
import configDefault from "./config/default.config";
import {httpMiddleware} from "./middleware/http.middleware";
import debug from "./util/debug.util";

export default class {

    constructor() {

        // 加载全局变量
        global.koahub = lodash.merge({}, packageFile);
        // new Koa()
        koahub.app = new Koa();

        this.init();
    }

    loadConfigs() {

        koahub.configs = new Loader(configDefault.loader.config);
        koahub.configs.index = Object.assign(config, koahub.configs.index);
    }

    loadPaths() {

        const appName = configDefault.app_path;
        const mainFile = process.argv[1];
        const mainPath = path.dirname(mainFile);
        const appPath = path.resolve(mainPath, appName);

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
        koahub.controllers = new Loader(configDefault.loader.controller);
    }

    loadHooks() {

        koahub.hook = new Hook();
    }

    loadUtils() {

        koahub.utils = new Loader(configDefault.loader.util);
        koahub.utils.lodash = lodash;
    }

    loadModels() {

        koahub.models = new Loader(configDefault.loader.model);
    }

    loadServices() {

        koahub.services = new Loader(configDefault.loader.service);
    }

    loadMiddlewares() {

        // log middleware
        if (koahub.configs.index.log_on) {
            koahub.app.use(logger());
        }

        // favicon middleware
        koahub.app.use(favicon(koahub.configs.index.favicon));
    }

    init() {

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
    getServer() {

        const server = http.Server(koahub.app.callback());
        return this.server = server;
    }

    // 支持自定义中间件
    getKoa() {

        return koahub.app;
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

    loadHttpMiddlewares() {

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

            // path验证，无效跳过中间件
            const paths = path.substr(1, path.length).split('/');
            if (paths[paths.length - 1].indexOf('.') != -1) {
                return true;
            }

            // path验证, 无效跳转
            let module = koahub.configs.index.default_module;
            let controller = koahub.configs.index.default_controller;
            let action = koahub.configs.index.default_action;

            let url = '';
            for (let key in paths) {
                if (!paths[key]) {
                    koahub.ctx.redirect(url);
                    return true;
                } else {
                    url += '/' + paths[key];
                }
            }

            return false;
        }));
    }

    run(port) {

        this.loadHttpMiddlewares();
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

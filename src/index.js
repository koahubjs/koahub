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
import config from "./config/default.config";
import {runAction} from "./util/default.util";

export default class {

    constructor() {

        if (global.koahub == undefined) {
            // 加载全局变量
            global.koahub = lodash.merge({}, packageFile);
        }

        this.loadPaths(config.app_path);

        // new Koa()
        const app = new Koa();

        koahub.app = app;
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
        koahub.configs.default = Object.assign(config, koahub.configs.default);
    }

    loadMiddlewares() {
        if (koahub.configs.default.log_on) {
            koahub.app.use(logger());
        }
        koahub.app.use(favicon(koahub.configs.default.favicon));
    }

    init() {
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

            runAction(ctx.path);
        });
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

    run(port = config.port) {

        this.init();

        if (this.server) {
            this.server.listen(port);
        } else {
            this.getServer().listen(port);
        }

        console.log(`[Koahubjs] Server running at http://127.0.0.1:${port}`);
        console.log(`[Koahubjs] Koahubjs version: ${koahub.version}`);
    }
}

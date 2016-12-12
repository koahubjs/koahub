import path from "path";
import http from "http";
import Koa from "koa";
import lodash from "lodash";
import logger from "koa-logger";
import favicon from "koa-favicon";
import colors from "colors/safe";
import packageFile from "./../package.json";
import Loader from "./lib/loader.class";
import Hook from "./lib/hook.class";
import Http from "./data/http.class";
import config from "./config/index.config";
import {httpMiddleware} from "./middleware/http.middleware";
import log, {debug} from "./util/log.util";
import {EXITCODE} from "./util/exit.util";

export default class Koahub {

    constructor() {

        // 防止多次初始化丢失中间件
        if (global.koahub == undefined) {

            // 加载全局变量
            global.koahub = packageFile;
            // new Koa()
            koahub.app = new Koa();

            this.init();
        } else {
            this.init(true);
        }
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
                process.exit(EXITCODE.EADDRINUSE);
            }
        });
    }

    loadConfigs() {

        // Object.assign({}, config) 创建新对象，不允许覆盖config
        koahub.configs = new Loader(config.loader.configs);
        koahub.configs.index = lodash.merge(Object.assign({}, config), koahub.configs.index);

        // app, runtime不允许覆盖
        koahub.configs.index.app = config.app;
        koahub.configs.index.runtime = config.runtime;
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

    loadPaths() {

        const rootPath = process.cwd();
        const runtimeName = koahub.config('runtime');
        const runtimePath = path.resolve(rootPath, runtimeName);
        const runtimeFile = process.argv[1];
        const appName = koahub.config('app');
        const appPath = path.resolve(rootPath, appName);
        const appFile = path.resolve(appPath, path.relative(runtimePath, runtimeFile));

        koahub.paths = {
            rootPath: rootPath,
            appName: appName,
            appPath: appPath,
            appFile: appFile,
            runtimeName: runtimeName,
            runtimePath: runtimePath,
            runtimeFile: runtimeFile
        };
    }

    loadLoaders() {

        for (let key in koahub.config('loader')) {

            // 移除configs重复加载
            if (key == 'configs') {
                continue;
            }
            koahub[key] = new Loader(koahub.config('loader')[key]);
        }
    }

    loadMiddlewares() {

        // log middleware
        if (koahub.config('logger')) {
            koahub.app.use(logger());
        }

        // favicon middleware
        koahub.app.use(favicon(koahub.config('favicon')));
    }

    init(restart = false) {

        // 自动加载重启
        if (restart) {

            this.loadLoaders();
        } else {

            this.loadErrors();
            this.loadConfigs();
            this.loadUtils();
            this.loadPaths();
            this.loadLoaders();
            this.loadMiddlewares();
        }
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

        log(colors.green(`Koahubjs Version: ${koahub.version}`));
        log(colors.green(`Koahubjs Website: http://js.koahub.com`));
        log(colors.green(`Server Enviroment: ${process.env.NODE_ENV || 'development'}`));
        log(colors.green(`Server running at: http://127.0.0.1:${port}`));
    }
}
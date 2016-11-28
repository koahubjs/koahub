import path from "path";
import http from "http";
import cluster from "cluster";
import os from "os";
import Koa from "koa";
import logger from "koa-logger";
import favicon from "koa-favicon";
import lodash from "lodash";
import colors from "colors/safe";
import packageFile from "./../package.json";
import Loader from "./lib/loader.class";
import Hook from "./lib/hook.class";
import Http from "./data/http.class";
import Watcher from "./lib/watcher.class";
import config from "./config/index.config";
import configDefault from "./config/default.config";
import {httpMiddleware} from "./middleware/http.middleware";
import {debug as captureDebug} from "./util/log.util";
import {dateFormat} from "./util/time.util";

export default class Koahub {

    constructor(options = {}) {

        // 加载全局变量
        global.koahub = lodash.merge({}, packageFile);
        // new Koa()
        koahub.app = new Koa();

        this.init();
    }

    loadConfigs() {

        koahub.configs = new Loader(configDefault.loader.config);
        // 优化config
        koahub.config = function (name) {
            if (name == undefined) {
                return Object.assign(config, koahub.configs.index);
            } else {
                return Object.assign(config, koahub.configs.index)[name];
            }
        };
    }

    loadPaths() {

        const rootPath = process.cwd();
        const appName = configDefault.app;
        const runtime = configDefault.runtime;
        const appPath = path.resolve(rootPath, appName);
        const runtimePath = path.resolve(rootPath, runtime);

        koahub.paths = {
            rootPath: rootPath,
            appName: appName,
            appPath: appPath,
            runtimeName: runtime,
            runtimePath: runtimePath
        };
    }

    loadWatcher(paths) {

        // watch依赖config
        if (koahub.config('watcher_on')) {
            new Watcher(paths);
        }
    }

    loadControllers() {

        // controller依赖http
        koahub.http = Http;
        koahub.controllers = new Loader(configDefault.loader.controller);
    }

    loadUtils() {

        // 自定义loader
        if (koahub.config('loader')) {
            for (let key in koahub.config('loader')) {
                koahub[key] = new Loader(koahub.config('loader')[key]);
            }
        }
        koahub.log = function (log, type = 'log') {
            if (typeof log == 'string') {
                console[type](`[${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}] [Koahubjs] ${log}`);
            } else {
                console[type](log);
            }
        }
    }

    loadModels() {

        koahub.models = new Loader(configDefault.loader.model);
    }

    loadServices() {

        koahub.services = new Loader(configDefault.loader.service);
    }

    loadMiddlewares() {

        // log middleware
        if (koahub.config('log_on')) {
            koahub.app.use(logger());
        }

        // favicon middleware
        koahub.app.use(favicon(koahub.config('favicon')));
    }

    init() {

        this.loadConfigs();
        this.loadPaths();
        this.loadControllers();
        this.loadModels();
        this.loadServices();
        this.loadUtils();
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
            captureDebug(err);
        });

        // 捕获promise reject错误
        process.on('unhandledRejection', function (reason, promise) {
            captureDebug(reason);
        });

        // 捕获未知错误
        process.on('uncaughtException', function (err) {
            captureDebug(err);
            if (err.message.indexOf(' EADDRINUSE ') > -1) {
                process.exit();
            }
        });
    }

    loadHttpMiddlewares() {

        // 加载hook中间件
        koahub.app.use(async function (ctx, next) {

            koahub.hook = new Hook(ctx, next);
            await next();
        });

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
        this.handleError();

        if (!port) {
            port = koahub.config('port');
        }

        if (koahub.config('cluster_on')) {
            if (cluster.isMaster) {

                const numCPUs = os.cpus().length;
                for (let i = 0; i < numCPUs; i++) {
                    cluster.fork();
                }

                cluster.on('exit', function (worker, code, signal) {
                    koahub.log(colors.red('worker ' + worker.process.pid + ' died'));
                    process.nextTick(function () {
                        cluster.fork();
                    });
                });

                koahub.log(colors.red('[Tips] In cluster mode, Multiple processes can\'t be Shared memory, Such as session'));

                this.started(port);
            } else {

                process.on('message', function (msg) {
                    if (msg.name == 'file') {
                        Watcher.workerGet(msg);
                    }
                });

                this.start(port);
            }
        } else {

            this.start(port);
            this.started(port);
        }
    }

    start(port) {

        if (this.server) {
            this.server.listen(port);
        } else {
            this.getServer().listen(port);
        }
    }

    started(port) {

        this.loadWatcher(koahub.paths);

        koahub.log(colors.green(`Koahubjs version: ${koahub.version}`));
        koahub.log(colors.green(`Koahubjs website: http://js.koahub.com`));
        koahub.log(colors.green(`Server Cluster Status: ${koahub.config('cluster_on')}`));
        koahub.log(colors.green(`Server Debug Status: ${koahub.config('debug')}`));
        koahub.log(colors.green(`Server File Watcher: ${koahub.config('watcher_on')}`));
        koahub.log(colors.green(`Server running at http://127.0.0.1:${port}`));
    }
}
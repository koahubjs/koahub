const fs = require('fs');
const Koa = require('koa');
const http = require('http');
const path = require('path');
const assert = require('assert');
const lodash = require('lodash');
const convert = require('koa-convert');
const debug = require('debug')('koahub');
const deprecate = require('depd')('koahub');

const common = require('./common');
const pkg = require('./../package.json');
const Hook = require('./lib/hook.class');
const Loader = require('./lib/loader.class');
const config = require('./config/default.config');
const Controller = require('./lib/controller.class');
const httpMiddleware = require('./middleware/http.middleware');

module.exports = class Koahub {

    constructor(options = {}) {

        // 加载全局变量
        global.koahub = pkg;

        this.koa = new Koa();
        this.options = options;
        this.init();
    }

    loadErrors() {

        // 监控错误日志
        this.koa.on('error', function (err, ctx) {
            common.log(err);
        });

        // 捕获promise reject错误
        process.on('unhandledRejection', function (reason, promise) {
            common.log(reason);
        });

        // 捕获未知错误
        process.on('uncaughtException', function (err) {
            common.log(err);
            if (err.message.indexOf(' EADDRINUSE ') > -1) {
                process.exit();
            }
        });
    }

    loadPaths() {

        const root = this.options.root || process.env.ROOT || process.cwd();
        const app = path.resolve(root, this.options.app || process.env.APP || 'app');

        koahub.paths = {
            app: app,
            root: root
        };
    }

    loadConfigs() {

        koahub.configs = new Loader(__dirname, config.loader.configs);
        koahub.configs = lodash.mergeWith(koahub.configs, new Loader(koahub.paths.app, config.loader.configs), common.arrayCustomizer);
    }

    loadUtils() {

        // config函数
        koahub.config = function (name, value) {
            switch (arguments.length) {
                case 0:
                    return koahub.configs;
                case 1:
                    if (name.indexOf('.') !== -1) {
                        const names = name.split('.');
                        return koahub.configs[names[0]][names[1]];
                    }
                    return koahub.configs.default[name];
                case 2:
                    if (name.indexOf('.') !== -1) {
                        const names = name.split('.');
                        koahub.configs[names[0]][names[1]] = value;
                        return;
                    }
                    koahub.configs.default[name] = value;
            }
        };

        // common函数
        if (fs.existsSync(path.resolve(koahub.paths.app, 'common.js'))) {
            koahub.common = common.requireDefault(path.resolve(koahub.paths.app, 'common.js'));
            assert(lodash.isPlainObject(koahub.common), 'Common.js must export plain object');
        }

        // controller继承
        koahub.controller = Controller;
    }

    loadHooks() {

        koahub.hook = new Hook();

        // hook初始化
        if (fs.existsSync(path.resolve(koahub.paths.app, 'hook.js'))) {
            koahub.hooks = common.requireDefault(path.resolve(koahub.paths.app, 'hook.js'));
            assert(lodash.isPlainObject(koahub.hooks), 'Hook.js must export plain object');
        }

        for (let key in koahub.hooks) {
            koahub.hook.add(key, koahub.hooks[key]);
        }
    }

    loadMiddlewares() {

        koahub.middlewares = new Loader(__dirname, koahub.config('loader').middlewares);
        koahub.middlewares = lodash.mergeWith(koahub.middlewares, new Loader(koahub.paths.app, koahub.config('loader').middlewares), common.arrayCustomizer);

        // 中间件排序
        for (let key in koahub.configs.middleware) {
            if (!lodash.includes(koahub.configs.middleware['middleware'], key) && key !== 'middleware') {
                koahub.configs.middleware['middleware'].push(key);
            }
        }

        // 自动加载中间件
        for (let key of koahub.configs.middleware['middleware']) {
            if (!koahub.configs.middleware[key]) {
                continue;
            }
            if (!koahub.middlewares[key]) {
                throw new Error(`The ${key} middleware not found, please export the middleware`);
                continue;
            }
            if (koahub.configs.middleware[key] === true) {
                this.use(koahub.middlewares[key]());
                continue;
            }
            this.use(koahub.middlewares[key](koahub.configs.middleware[key]));
        }
    }

    loadLoaders() {

        for (let key in koahub.config('loader')) {

            // 移除重复加载
            if (key === 'configs' || key === 'middlewares') {
                continue;
            }
            koahub[key] = new Loader(koahub.paths.app, koahub.config('loader')[key]);
        }
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

    init() {

        this.loadErrors();
        this.loadPaths();
        this.loadConfigs();
        this.loadUtils();
        this.loadHooks();
        this.loadMiddlewares();
        this.loadLoaders();
        this.loadModules();
    }

    // 默认支持koa middleware
    use(fn) {

        if (common.isGeneratorFunction(fn)) {
            fn = convert(fn);
        }
        this.koa.use(fn);
    }

    // 支持express middleware
    useExpress(fn) {

        fn = common.expressMiddlewareToKoaMiddleware(fn);
        this.use(fn);
    }

    // 获取koa
    getKoa() {

        deprecate('app.getKoa() has been deprecated, please use the app.use() to use middleware!');
        return this.koa;
    }

    // 获取server
    getServer() {

        const server = http.Server(this.koa.callback());
        return this.server = server;
    }

    loadHttpMiddlewares() {

        // 加载http中间件
        this.use(httpMiddleware().skip(function (ctx) {

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

    async run(port) {

        // http中间件最后加载
        this.loadHttpMiddlewares();

        if (!port) {
            port = koahub.config('port');
        }

        await this.start(port);
    }

    async start(port) {

        // 执行钩子 serverStart
        await koahub.hook.run('serverStart');

        if (this.server) {
            this.server.listen(port, this.started(port));
        } else {
            this.getServer().listen(port, this.started(port));
        }
    }

    async started(port) {

        // 执行钩子 serverStarted
        await koahub.hook.run('serverStarted');

        common.log(`Koahub Version: ${koahub.version}`);
        common.log(`Koahub Website: http://js.koahub.com`);
        common.log(`Nodejs Version: ${process.version}`);
        common.log(`Nodejs Platform: ${process.platform} ${process.arch}`);
        common.log(`Server Enviroment: ${this.koa.env}`);
        common.log(`Server running at: http://127.0.0.1:${port}`);
    }
}
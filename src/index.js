import Koa from "koa";
import path from "path";
import http from "http";

import Loader from "./lib/loader.class";
import Http from "./data/http.class";
import Config from "./config/config.class";
import Hook from "./lib/hook.class";

export default class {

    constructor(appName = 'app') {

        if (global.koahub == undefined) {
            // 加载全局变量
            global.koahub = {};
        }

        this.config = Config.loader(appName);

        this.loadPaths(appName);

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
        koahub.controllers = new Loader(this.config.controller);
    }

    loadHooks() {
        koahub.hook = new Hook();
    }

    loadUtils() {
        koahub.utils = new Loader(this.config.util);
    }

    loadModels() {
        koahub.models = new Loader(this.config.model);
    }

    loadConfigs() {
        koahub.configs = new Loader(this.config.config);
    }

    init() {
        this.loadControllers();
        this.loadModels();
        this.loadUtils();
        this.loadConfigs();
        this.loadHooks();

        koahub.app.use(function(ctx, next) {

            koahub.ctx = ctx;

            // 快捷方法
            global.ctx = ctx;

            let path = ctx.path;
            let action = path.slice(path.lastIndexOf('/'));

            path = path.slice(0, path.lastIndexOf('/'));

            let include = false;
            for (let key in koahub.controllers) {
                if (key == path) {
                    include = true;
                    break;
                }
            }

            if (include) {
                let ctrl = koahub.controllers[path];
                let pros = Object.getOwnPropertyNames(ctrl.prototype).filter(function(value) {
                    if (value == 'constructor') {
                        return false;
                    }
                    return true;
                });

                var callFlag = true;
                for (let k in pros) {
                    if ('/' + pros[k] == action) {
                        Object.getPrototypeOf(new ctrl())[pros[k]].call(this);
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
    getServer() {
        const server = http.Server(koahub.app.callback());
        return this.server = server;
    }

    // 支持自定义中间件
    getKoa() {
        return koahub.app;
    }

    run(port = 3000) {

        this.init();

        if (this.server) {
            this.server.listen(port);
        } else {
            this.getServer().listen(port);
        }

        console.log(`server running at http://127.0.0.1:${port}`);
    }
}

import Koa from "koa";
import loader from "./../lib/loader";
import bookshelf from "./../data/mysql.init";
import config from "./../config/loader.config";
import http from "./http.init";

export default class {

    constructor(options = {}) {
        // 加载全局变量
        global.koahub = {};

        // new Koa()
        const app = new Koa();

        // 加载app到全局
        global.app = app;
    }

    loadControllers() {
        // controller依赖http
        koahub.http = http;
        koahub.controllers = loader(config.controller);
    }

    loadUtils() {
        koahub.utils = loader(config.util);

        // 快捷方法
        if (koahub.utils.model != undefined) {
            koahub.model = koahub.utils.model;
        }
    }

    loadModels() {
        // model依赖bookshelf
        koahub.bookshelf = bookshelf;
        koahub.models = loader(config.model);
    }

    loadConfigs() {
        koahub.configs = loader(config.config);
    }

    init() {
        this.loadControllers();
        this.loadModels();
        // util model依赖model
        this.loadUtils();
        this.loadConfigs();

        app.use(function (ctx, next) {

            koahub.ctx = ctx;

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
                let pros = Object.getOwnPropertyNames(ctrl.prototype).filter(function (value) {
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

    // 支持自定义中间件
    getKoa() {
        return koahub.app;
    }

    run(port = 3000) {

        this.init();

        app.listen(port);

        console.log(`server running at http://127.0.0.1:${port}`);
    }
}
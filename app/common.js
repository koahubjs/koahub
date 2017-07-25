const co = require('co');
const lodash = require('lodash');
const moment = require('moment');

module.exports = {

    /**
     * get module, controller, action from path
     * @param path
     * @returns {{module, controller, action}}
     */
    getModuleControllerAction(path) {

        let paths = [];
        if (path != '/') {
            paths = path.substr(1, path.length).split('/');
        }

        let module = koahub.config('default_module');
        let controller = koahub.config('default_controller');
        let action = koahub.config('default_action');

        switch (paths.length) {
            case 0:

                break;
            case 1:

                module = paths[0];
                break;
            case 2:

                module = paths[0];
                controller = paths[1];
                break;
            default:

                module = paths.shift();
                action = paths.pop();

                if (koahub.controllers[`/${module}/${paths.join('/')}`]) {
                    controller = paths.join('/');
                    break;
                }

                paths.push(action);
                if (koahub.controllers[`/${module}/${paths.join('/')}`]) {
                    controller = paths.join('/');
                    action = koahub.config('default_action');
                    break;
                }

                action = paths.pop();
                controller = paths.join('/');

        }

        return {module, controller, action};
    },

    /**
     * run controller && action controller
     * @param ctx
     * @param next
     * @param args
     * @returns {Promise.<*>}
     */
    async runController(ctx, next, ...args){

        const {module, controller, action} = this.getModuleControllerAction(ctx.path);
        const ctrl = koahub.controllers[`/${module}/${controller}`];
        if (ctrl) {

            const _ctrl = new ctrl(ctx, next);
            const methods = Object.getOwnPropertyNames(ctrl.prototype);

            // constructor不响应404，中断执行
            if (ctx.status != 404) {
                return;
            }

            if (lodash.includes(methods, action)) {

                let result;
                let parseResult = function (data) {
                    if (data) {
                        result = data;
                    }
                };

                // 控制器初始化
                if (lodash.includes(methods, '_initialize')) {
                    parseResult(await this.getPromiseFunction(_ctrl, '_initialize')(...args));
                }
                // 控制器初始化不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 控制器前置
                if (lodash.includes(methods, '_before')) {
                    parseResult(await this.getPromiseFunction(_ctrl, '_before')(...args));
                }
                // 控制器前置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 方法前置
                if (lodash.includes(methods, `_before_${action}`)) {
                    parseResult(await this.getPromiseFunction(_ctrl, `_before_${action}`)(...args));
                }
                // 方法前置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                parseResult(await this.getPromiseFunction(_ctrl, action)(...args));

                // 不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 方法后置
                if (lodash.includes(methods, `_after_${action}`)) {
                    parseResult(await this.getPromiseFunction(_ctrl, `_after_${action}`)(...args));
                }
                // 方法后置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 控制器后置
                if (lodash.includes(methods, '_after')) {
                    parseResult(await this.getPromiseFunction(_ctrl, '_after')(...args));
                }
                // 控制器后置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                return result;
            } else {

                // 控制器空操作
                if (lodash.includes(methods, '_empty')) {
                    return this.runController(Object.assign(ctx, {path: `/${module}/${controller}/_empty`}), next, ...args);
                } else {
                    this.log('Not Found Action');
                    return;
                }
            }
        } else {

            if (koahub.controllers[`/${module}/empty`]) {
                return this.runController(Object.assign(ctx, {path: `/${module}/empty/${action}`}), next, ...args);
            } else {
                this.log('Not Found Controller');
                return;
            }
        }
    },

    /**
     * run http filter ctx && controller methods
     * @param ctx
     * @param next
     * @param args
     * @returns {Promise.<*|Promise.<*>>}
     */
    async runHttp(ctx, next, ...args) {

        const {module, controller, action} = this.getModuleControllerAction(ctx.path);
        if (!lodash.includes(koahub.modules, module)) {
            this.log('Not Found Module');
            return;
        }

        // 移除控制器中跟ctx中同名的属性
        for (let name in ctx) {
            if (typeof ctx[name] !== 'function' && action === name) {
                throw new Error(`Don\'t use the "${action}" action in the controller`);
            }
        }

        // 过滤控制器默认方法
        const filters = ['constructor', '_initialize', '_before', `_before_${action}`, `_after_${action}`, '_after', '_empty'];
        if (lodash.includes(filters, action)) {
            this.log('Don\'t access the "${action}"');
            return;
        }

        return await this.runController(ctx, next, ...args);
    },

    /**
     * Check whether a function is generator.
     *
     * @param  {Function} fn
     * @return {Boolean}
     */
    isGeneratorFunction(fn) {
        return typeof fn === 'function' &&
            fn.constructor &&
            fn.constructor.name === 'GeneratorFunction'
    },

    /**
     * Parase express middleware to koa middleware
     * @param fn
     * @returns {Function}
     */
    expressMiddlewareToKoaMiddleware(fn) {
        return function (ctx, next) {
            if (fn.length < 3) {
                fn(ctx.req, ctx.res);
                return next();
            } else {
                return new Promise((resolve, reject) => {
                    fn(ctx.req, ctx.res, err => {
                        if (err) reject(err)
                        else resolve(next())
                    })
                })
            }
        }
    },

    /**
     * generator to promise
     * @param instance
     * @param method
     * @returns {Function}
     */
    getPromiseFunction(instance, method) {
        if (this.isGeneratorFunction(instance[method])) {
            return co.wrap(instance[method]).bind(instance);
        }
        return instance[method].bind(instance);
    },

    /**
     * return es6 module or common module
     * @param file
     * @returns {*}
     */
    requireDefault(file){

        const lib = require(file);
        if (lib.hasOwnProperty('default') && Object.keys(lib).length === 1) {
            return lib.default;
        } else {
            return lib;
        }
    },

    /**
     * console format
     * @param log
     * @param type
     */
    log(log, type = 'log') {

        if (typeof log === 'string') {
            console[type](`[${moment().format('YYYY-MM-DD HH:mm:ss')}] [Koahub] ${log}`);
        } else {
            const msg = log.stack || log.toString();
            console[type]();
            console[type](`[${moment().format('YYYY-MM-DD HH:mm:ss')}] [Koahub] [Log]`);
            console[type](msg);
            console[type]();
        }
    },

    /**
     * array customizer
     * @param objValue
     * @param srcValue
     * @returns {string|*|Array.<T>}
     */
    arrayCustomizer(objValue, srcValue) {
        if (lodash.isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    }
}
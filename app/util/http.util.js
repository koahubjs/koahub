const lodash = require('lodash');
const defaultUtil = require('./default.util');
const log = require('./log.util');

module.exports = {

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
                    parseResult(await defaultUtil.getPromiseFunction(_ctrl, '_initialize')(...args));
                }
                // 控制器初始化不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 控制器前置
                if (lodash.includes(methods, '_before')) {
                    parseResult(await defaultUtil.getPromiseFunction(_ctrl, '_before')(...args));
                }
                // 控制器前置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 方法前置
                if (lodash.includes(methods, `_before_${action}`)) {
                    parseResult(await defaultUtil.getPromiseFunction(_ctrl, `_before_${action}`)(...args));
                }
                // 方法前置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                parseResult(await defaultUtil.getPromiseFunction(_ctrl, action)(...args));

                // 不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 方法后置
                if (lodash.includes(methods, `_after_${action}`)) {
                    parseResult(await defaultUtil.getPromiseFunction(_ctrl, `_after_${action}`)(...args));
                }
                // 方法后置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 控制器后置
                if (lodash.includes(methods, '_after')) {
                    parseResult(await defaultUtil.getPromiseFunction(_ctrl, '_after')(...args));
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
                    log('Not Found Action');
                    return;
                }
            }
        } else {

            if (koahub.controllers[`/${module}/empty`]) {
                return this.runController(Object.assign(ctx, {path: `/${module}/empty/${action}`}), next, ...args);
            } else {
                log('Not Found Controller');
                return;
            }
        }
    },

    async runHttp(ctx, next, ...args) {

        const {module, controller, action} = this.getModuleControllerAction(ctx.path);
        if (!lodash.includes(koahub.modules, module)) {
            log('Not Found Module');
            return;
        }

        // 移除控制器中跟ctx中同名的属性
        for (let name in ctx) {
            if (typeof ctx[name] !== 'function' && action === name) {
                throw new Error(`Don\'t use the "${action}" in the controller`);
                return;
            }
        }

        // 过滤控制器默认方法
        const filters = ['constructor', '_initialize', '_before', `_before_${action}`, `_after_${action}`, '_after', '_empty'];
        if (lodash.includes(filters, action)) {
            log('Don\'t access the "${action}"');
            return;
        }

        return await this.runController(ctx, next, ...args);
    }
}
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
            case 3:

                module = paths[0];
                controller = paths[1];
                action = paths[2];
                break;
            default:

                module = paths[0];
                controller = '';
                for (let key in paths) {
                    if (key > 0 && key < paths.length - 1) {
                        if (key == paths.length - 2) {
                            controller += paths[key];
                            break;
                        }
                        controller += paths[key] + '/';
                    }
                }
                action = paths[paths.length - 1];
        }

        return {
            module: module,
            controller: controller,
            action: action
        }
    },

    runAction(ctx, next, ...args) {

        const {module, controller, action} = this.getModuleControllerAction(ctx.path);
        if (!lodash.includes(koahub.modules, module)) {
            log('Not Found Module');
            return;
        }

        const ctrl = koahub.controllers[`/${module}/${controller}`];
        const filters = ['constructor', '_initialize', '_before', `_before_${action}`, `_after_${action}`, '_after', '_empty'];

        // 方法首字符是`_`表示私有方法
        if (ctrl && action.substr(0, 1) != '_' && !lodash.includes(filters, action)) {

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
                    parseResult(defaultUtil.getPromiseFunction(_ctrl, '_initialize')(...args));
                }
                // 控制器初始化不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 控制器前置
                if (lodash.includes(methods, '_before')) {
                    parseResult(defaultUtil.getPromiseFunction(_ctrl, '_before')(...args));
                }
                // 控制器前置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 方法前置
                if (lodash.includes(methods, `_before_${action}`)) {
                    parseResult(defaultUtil.getPromiseFunction(_ctrl, `_before_${action}`)(...args));
                }
                // 方法前置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                parseResult(defaultUtil.getPromiseFunction(_ctrl, action)(...args));

                // 不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 方法后置
                if (lodash.includes(methods, `_after_${action}`)) {
                    parseResult(defaultUtil.getPromiseFunction(_ctrl, `_after_${action}`)(...args));
                }
                // 方法后置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 控制器后置
                if (lodash.includes(methods, '_after')) {
                    parseResult(defaultUtil.getPromiseFunction(_ctrl, '_after')(...args));
                }
                // 控制器后置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                return result;
            } else {

                // 控制器空操作
                if (lodash.includes(methods, '_empty')) {
                    _ctrl['_empty'](...args);
                } else {
                    log('Not Found Action');
                }
            }
        } else {

            log('Not Found Controller');
        }
    }
}
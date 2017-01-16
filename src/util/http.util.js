import lodash from "lodash";
import {http as httpDebug} from "./log.util";

// run module/controller/action
export async function runAction(ctx, next, ...args) {

    const {module, controller, action} = getModuleControllerAction(ctx.path);

    if (!lodash.includes(koahub.modules, module)) {

        httpDebug('Not Found Module');
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

            try {
                let result;
                let parseResult = function (data) {
                    if (data) {
                        result = data;
                    }
                };

                // 控制器初始化
                if (lodash.includes(methods, '_initialize')) {
                    parseResult(await _ctrl['_initialize'](...args));
                }
                // 控制器初始化不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 控制器前置
                if (lodash.includes(methods, '_before')) {
                    parseResult(await _ctrl['_before'](...args));
                }
                // 控制器前置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 方法前置
                if (lodash.includes(methods, `_before_${action}`)) {
                    parseResult(await _ctrl[`_before_${action}`](...args));
                }
                // 方法前置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                parseResult(await _ctrl[action](...args));
                // 不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 方法后置
                if (lodash.includes(methods, `_after_${action}`)) {
                    parseResult(await _ctrl[`_after_${action}`](...args));
                }
                // 方法后置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                // 控制器后置
                if (lodash.includes(methods, '_after')) {
                    parseResult(await _ctrl['_after'](...args));
                }
                // 控制器后置不响应404，中断执行
                if (ctx.status != 404) {
                    return;
                }

                return result;
            } catch (err) {
                throw err;
            }
        } else {

            // 控制器空操作
            if (lodash.includes(methods, '_empty')) {
                await _ctrl['_empty'](...args);
            } else {
                httpDebug('Not Found Action');
            }
        }
    } else {

        httpDebug('Not Found Controller');
    }
}

// url obj to param
export function urlObjToParam(query, obj) {

    let param = '';
    for (let key in obj) {
        param += '&' + key + '=' + obj[key];
    }

    param = '?' + param.substr(1, param.length);
    if (query) {
        param += '&' + query;
    }
    return param;
}

// get module controller action
export function getModuleControllerAction(path) {

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
}

import lodash from "lodash";
import { http as httpDebug } from "./log.util";

// run module/controller/action
export async function runAction(ctx, next, denyList = true, ...args) {

    const { module, controller, action } = getModuleControllerAction(ctx.path);

    if (!lodash.includes(koahub.modules, module)) {

        httpDebug('Not Found Module');
        return;
    }

    const ctrl = koahub.controllers[`/${module}/${controller}`];
    if (ctrl) {

        const _ctrl = new ctrl(ctx, next);
        const methods = Object.getOwnPropertyNames(ctrl.prototype).filter(function(value) {
            return value !== 'constructor';
        });

        // constructor不响应404，中断执行
        if (ctx.status != 404) {
            return;
        }

        if (denyList) {
            // denyList禁用控制器方法
            if (_ctrl.denyList) {
                if (lodash.isArray(_ctrl.denyList)) {
                    if (lodash.includes(_ctrl.denyList, action)) {
                        return;
                    }
                }
            }
        }

        if (lodash.includes(methods, action)) {

            try {

                // 控制器前置
                if (lodash.includes(methods, '_before')) {
                    await _ctrl['_before'](...args);
                }

                // 方法前置
                if (lodash.includes(methods, `_before_${action}`)) {
                    await _ctrl[`_before_${action}`](...args);
                }

                await _ctrl[action](...args);

                // 控制器后置
                if (lodash.includes(methods, `_after_${action}`)) {
                    await _ctrl[`_after_${action}`](...args);
                }

                // 方法后置
                if (lodash.includes(methods, '_after')) {
                    await _ctrl['_after'](...args);
                }
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

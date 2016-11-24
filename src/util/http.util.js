import lodash from "lodash";
import {http as httpDebug} from "./log.util";

// run module/controller/action
export async function runAction(ctx, next) {

    const {module, controller, action} = getModuleControllerAction(ctx.path);

    const modules = getAllModules();
    if (!lodash.includes(modules, module)) {

        httpDebug('Not Found Module');
        return;
    }

    const ctrl = koahub.controllers[`/${module}/${controller}`];
    if (ctrl) {

        const _ctrl = new ctrl(ctx, next);
        const methods = Object.getOwnPropertyNames(ctrl.prototype).filter(function (value) {
            return value !== 'constructor';
        });

        if (lodash.includes(methods, action)) {

            try {
                await _ctrl[action](this);
            } catch (err) {
                throw err;
            }
        } else {

            httpDebug('Not Found Action');
        }
    } else {

        httpDebug('Not Found Controller');
    }
}

// get all modules
export function getAllModules() {

    let modules = [];
    for (let key in koahub.controllers) {
        modules.push(key.split('/')[1]);
    }
    modules = lodash.union(modules);
    return modules;
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
// run module/controller/action
export function runAction(path, _throw = false) {

    const {module, controller, action} = getModuleControllerAction(path);

    const modules = getAllModules();
    if (!koahub.utils.lodash.includes(modules, module)) {
        if (_throw) {
            ctx.throw(404, 'Not Found Module');
        } else {
            console.error('Not Found Module');
        }
        return;
    }

    const ctrl = koahub.controllers[`/${module}/${controller}`];
    if (ctrl) {
        let property = Object.getOwnPropertyNames(ctrl.prototype).filter(function (value) {
            if (value == 'constructor') {
                return false;
            }
            return true;
        });

        for (let k in property) {
            if (property[k] == action) {
                Object.getPrototypeOf(new ctrl())[property[k]].call(this);
                return;
            }
        }

        if (_throw) {
            ctx.throw(404, 'Not Found Action');
        } else {
            console.error('Not Found Action');
        }
    } else {

        if (_throw) {
            ctx.throw(404, 'Not Found Controller');
        } else {
            console.error('Not Found Controller');
        }
    }
}

// get all modules
export function getAllModules() {

    let modules = [];
    for (let key in koahub.controllers) {
        modules.push(key.split('/')[1]);
    }
    modules = koahub.utils.lodash.union(modules);
    return modules;
}

// get module controller action
export function getModuleControllerAction(path) {

    let paths = [];
    if (path != '/') {
        paths = path.substr(1, path.length).split('/');
        for (var key in paths) {
            if (!paths[key]) {
                ctx.throw(403, 'The url is error');
                return;
            }
        }
    }

    let module = koahub.configs.index.default_module;
    let controller = koahub.configs.index.default_controller;
    let action = koahub.configs.index.default_action;

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
            for (var key in paths) {
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
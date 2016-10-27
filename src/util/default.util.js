// run module/controller/action
export function runAction(path) {

    const paths = path.split('/');
    const action = paths[paths.length - 1];
    const module = paths[1];
    const _path = path.slice(0, path.lastIndexOf('/'));

    let include = false;
    for (let key in koahub.controllers) {
        if (key == _path) {
            include = true;
            break;
        }
    }

    if (include) {
        let controller = koahub.controllers[_path];
        let property = Object.getOwnPropertyNames(controller.prototype).filter(function (value) {
            if (value == 'constructor') {
                return false;
            }
            return true;
        });

        for (let k in property) {
            if (property[k] == action) {
                Object.getPrototypeOf(new controller())[property[k]].call(this);
                return;
            }
        }

        if (`${_path}/index` == path) {
            ctx.throw(404, 'Not Found Action');
            return;
        }
        ctx.redirect(`${_path}/index`);
    } else {

        if (!module || module == koahub.configs.default.default_module) {
            ctx.redirect(`/${koahub.configs.default.default_module}/${koahub.configs.default.default_controller}/${koahub.configs.default.default_action}`);
        } else {
            ctx.redirect(`/${module}/${koahub.configs.default.default_controller}/${koahub.configs.default.default_action}`);
        }
    }
}
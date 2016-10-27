// hooks 定义
// {
//     addOrder: [
//         '/admin/index/index'
//     ]
// }

export default class {
    constructor() {
        this.hooks = {};
    }

    get() {
        return this.hooks;
    }

    add(name, action) {
        let add = true;
        for (let key in this.hooks) {
            if (name == key) {
                this.hooks[key].push(action);
                add = false;
            }
        }
        if (add) {
            this.hooks[name] = [action];
        }

        return this.get();
    }

    run(name) {
        for (let key in this.hooks) {
            if (name == key) {
                for (let path of this.hooks[key]) {
                    if (/\w+\(.*\)$/.test(path)) {
                        this.runFunction(path);
                    } else {
                        this.runAction(path);
                    }
                }
            }
        }
    }

    runAction(path) {
        const paths = path.split('/');
        const action = paths[paths.length - 1];
        const _path = path.slice(0, path.lastIndexOf('/'));

        let include = false;
        for (let _key in koahub.controllers) {
            if (_key == _path) {
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

            console.error('Hook Not Found Action');
        } else {
            console.error('Hook Not Found Controller');
        }
    }

    runFunction(value) {
        eval(`koahub.utils.${value}`);
    }
}

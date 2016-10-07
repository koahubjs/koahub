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
                        this.runController(path);
                    }
                }
            }
        }
    }

    runController(path) {
        let action = path.slice(path.lastIndexOf('/'));
        path = path.slice(0, path.lastIndexOf('/'));

        let include = false;
        for (let _key in koahub.controllers) {
            if (_key == path) {
                include = true;
                break;
            }
        }

        if (include) {
            let ctrl = koahub.controllers[path];
            let pros = Object.getOwnPropertyNames(ctrl.prototype).filter(function(value) {
                if (value == 'constructor') {
                    return false;
                }
                return true;
            });

            let callFlag = true;
            for (let k in pros) {
                if ('/' + pros[k] == action) {
                    Object.getPrototypeOf(new ctrl())[pros[k]].call(this);
                    callFlag = false;
                }
            }

            if (callFlag) {
                console.error('Hook Not Found Method');
            }
        } else {
            console.error('Hook Not Found Controller');
        }
    }

    runFunction(value) {
        eval(`koahub.utils.${value}`);
    }
}

import {runAction} from "./../util/default.util";

// hooks 定义
// {
//     hook1: [
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
        runAction(path);
    }

    runFunction(value) {
        eval(`koahub.utils.${value}`);
    }
}

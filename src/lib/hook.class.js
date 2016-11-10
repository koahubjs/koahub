import {runAction} from "./../util/http.util";

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

    async run(name) {
        for (let key in this.hooks) {
            if (name == key) {
                for (let path of this.hooks[key]) {
                    if (/\w+\(.*\)$/.test(path)) {
                        this.runFunction(path);
                    } else {
                        await this.runAction(path);
                    }
                }
            }
        }
    }

    async runAction(path) {
        await runAction(path);
    }

    runFunction(value) {
        eval(`koahub.utils.${value}`);
    }
}

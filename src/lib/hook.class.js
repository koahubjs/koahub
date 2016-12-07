import {runAction} from "./../util/http.util";

export default class Hook {
    constructor(ctx, next) {

        this.ctx = ctx;
        this.next = next;

        this.hooks = {};
    }

    get(name) {

        if (name == undefined) {
            return this.hooks;
        } else {
            for (let key in this.hooks) {
                if (name == key) {
                    return this.hooks[name];
                }
            }
        }

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
    }

    async run(name) {

        for (let key in this.hooks) {
            if (name == key) {
                for (let action of this.hooks[key]) {
                    if (/(\/\w+)+/.test(action)) {

                        // run action
                        await this.runAction(action);
                    } else {

                        // run functions
                        let args = [];
                        for (let i = 1; i < arguments.length; i++) {
                            args.push(arguments[i]);
                        }
                        action.apply(this, args);
                    }
                }
            }
        }
    }

    async runAction(path) {

        await runAction(Object.assign(this.ctx, {path: path}), this.next);
    }
}

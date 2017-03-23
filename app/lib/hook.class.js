const httpUtil = require('./../util/http.util');

module.exports = class Hook {

    constructor(ctx, next) {

        this.ctx = ctx;
        this.next = next;

        this.hooks = {};
    }

    get(name) {

        if (arguments.length === 0) {
            return this.hooks;
        } else {
            for (let key in this.hooks) {
                if (name === key) {
                    return this.hooks[name];
                }
            }
        }
    }

    add(name, action) {

        let add = true;
        for (let key in this.hooks) {
            if (name === key) {
                this.hooks[key].push(action);
                add = false;
            }
        }
        if (add) {
            this.hooks[name] = [action];
        }
    }

    run(name) {

        for (let key in this.hooks) {
            if (name === key) {
                for (let action of this.hooks[key]) {
                    if (/(\/\w+)+/.test(action)) {

                        // run http
                        return httpUtil.runHttp(Object.assign(this.ctx, {path: action}), this.next);
                    } else {

                        // run functions
                        let args = [];
                        for (let i = 1; i < arguments.length; i++) {
                            args.push(arguments[i]);
                        }
                        return action(...args);
                    }
                }
            }
        }
    }
}

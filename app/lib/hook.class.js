const common = require('./../common');

module.exports = class Hook {

    constructor(ctx, next) {
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

    add(name, fn) {

        if (this.hooks[name]) {
            common.log(`The "${name}" hook already exists. repeat adding will cover before`, 'info');
        }

        this.hooks[name] = fn;
    }

    async run(name) {

        let fn = this.hooks[name];
        if (fn && typeof fn === 'function') {
            let args = [];
            for (let i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            return await fn(...args);
        }
    }
}

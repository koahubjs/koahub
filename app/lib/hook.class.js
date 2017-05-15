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

        if (typeof fn !== 'function') {
            throw new Error(`The "${name}" hook only support function`);
            return;
        }

        this.hooks[name] = fn;
    }

    run(name, ...args) {

        const fn = this.hooks[name];
        if (!fn) {
            common.log(`The "${name}" hook not found`, 'info');
            return;
        }
        return fn(...args);
    }
}

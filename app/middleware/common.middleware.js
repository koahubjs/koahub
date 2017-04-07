const lodash = require('lodash');
const assert = require('assert');
const debug = require('debug')('koahub');

module.exports = function () {

    return async function (ctx, next) {

        // 加载koahub.common
        for (let key in koahub.common) {
            if (!ctx[key]) {
                ctx[key] = koahub.common[key];
            } else {
                throw new Error(`Don\'t use the "${key}" method in the common.js`);
            }
            debug(`auto load ctx ${key}`);
        }

        // 加载config
        ctx.config = koahub.config;
        debug(`auto load ctx config`);

        await next();
    }
}
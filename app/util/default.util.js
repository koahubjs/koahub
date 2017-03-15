const co = require('co');

module.exports = {

    /**
     * Check whether a function is generator.
     *
     * @param  {Function} fn
     * @return {Boolean}
     */
    isGeneratorFunction(fn) {
        return typeof fn === 'function' &&
            fn.constructor &&
            fn.constructor.name === 'GeneratorFunction'
    },

    /**
     * Parase express middleware to koa middleware
     * @param fn
     * @returns {Function}
     */
    expressMiddlewareToKoaMiddleware(fn) {
        return function (ctx, next) {
            if (fn.length < 3) {
                fn(ctx.req, ctx.res);
                return next();
            } else {
                return new Promise((resolve, reject) => {
                    fn(ctx.req, ctx.res, err => {
                        if (err) reject(err)
                        else resolve(next())
                    })
                })
            }
        }
    },

    /**
     * generator to promise
     * @param instance
     * @param method
     * @returns {Function}
     */
    getPromiseFunction(instance, method) {
        if (this.isGeneratorFunction(instance[method])) {
            return co.wrap(instance[method]).bind(instance);
        }
        return instance[method].bind(instance);
    },

    /**
     * url obj to param
     * @param query
     * @param obj
     * @returns {string}
     */
    urlObjToParam(query, obj) {

        let param = '';
        for (let key in obj) {
            param += '&' + key + '=' + obj[key];
        }

        param = '?' + param.substr(1, param.length);
        if (query) {
            param += '&' + query;
        }
        return param;
    }
}
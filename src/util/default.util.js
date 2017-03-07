/**
 * Check whether a function is generator.
 *
 * @param  {Function} fn
 * @return {Boolean}
 */
export function isGeneratorFunction(fn) {
    return typeof fn === 'function' &&
        fn.constructor &&
        fn.constructor.name === 'GeneratorFunction'
}

/**
 * Parase express middleware to koa middleware
 * @param fn
 * @returns {Function}
 */
export function expressMiddlewareToKoaMiddleware(fn) {
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
}
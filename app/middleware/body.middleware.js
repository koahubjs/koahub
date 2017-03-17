const body = require('koa-body');

module.exports = function (options) {

    return async function (ctx, next) {
        await body(options)(ctx, function () {
            return new Promise((resolve, reject) => {
                if (!ctx.request.body.files) {
                    ctx.post = ctx.request.body;
                } else {
                    ctx.post = ctx.request.body.fields;
                    ctx.file = ctx.request.body.files;
                }
                resolve();
            });
        });

        await next();
    }
};

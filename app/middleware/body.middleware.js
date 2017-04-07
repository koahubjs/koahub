const body = require('koa-body');
const debug = require('debug')('koahub');

module.exports = function (options) {

    return async function (ctx, next) {
        await body(options)(ctx, function () {
            return new Promise((resolve, reject) => {
                if (!ctx.request.body.files) {
                    ctx.post = ctx.request.body;

                    debug(`auto load ctx post`);
                } else {
                    ctx.post = ctx.request.body.fields;
                    ctx.file = ctx.request.body.files;

                    debug(`auto load ctx post`);
                    debug(`auto load ctx file`);
                }
                resolve(true);
            });
        });

        await next();
    }
};

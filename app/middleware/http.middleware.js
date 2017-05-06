const {parse} = require('url');
const pathToRegexp = require('path-to-regexp');
const lodash = require('lodash');
const skip = require('./skip.middleware');
const common = require('./../common');

module.exports = function httpMiddleware() {

    const http = async function (ctx, next) {

        let routers = koahub.configs.router;
        let regexp, regres, index, url, path, query, method = ctx.method;

        // 注入params参数
        ctx.params = {}

        if (routers && routers.length) {
            for (let router in routers) {

                let keys = [];
                regexp = pathToRegexp(routers[router][0], keys, {strict: true, sensitive: true});
                regres = regexp.exec(ctx.path);

                if (regres) {
                    for (var key in keys) {
                        ctx.params[keys[key].name] = regres[parseInt(key) + 1];
                    }
                    index = router;
                    break;
                }
            }

            if (index) {
                const router = routers[index][1];
                if (lodash.isString(router)) {
                    path = router;
                    query = parse(ctx.url).search || '';
                    url = path + query;
                } else {
                    const routerMethod = router[method.toLowerCase()];
                    if (routerMethod) {
                        path = routerMethod;
                        query = parse(ctx.url).search || '';
                        url = path + query;
                    } else {
                        common.log('Not Found Router');
                        return;
                    }
                }

                await common.runHttp(Object.assign(ctx, {originalPath: ctx.path, path: path, url: url}), next);
            } else {
                await common.runHttp(ctx, next);
            }
        } else {
            await common.runHttp(ctx, next);
        }
    };

    http.skip = skip;

    return http;
}

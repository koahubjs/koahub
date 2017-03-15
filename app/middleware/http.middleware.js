const {parse} = require('url');
const pathToRegexp = require('path-to-regexp');
const lodash = require('lodash');
const skip = require('./skip.middleware');
const log = require('./../util/log.util');
const httpUtil = require('./../util/http.util');
const defaultUtil = require('./../util/default.util');

module.exports = function httpMiddleware() {

    const http = function (ctx, next) {

        const routers = koahub.configs.router;

        let regexp, regres, index, url, path, method = ctx.method,
            params = [];

        if (routers && routers.length) {
            for (let router in routers) {

                let keys = [];
                regexp = pathToRegexp(routers[router][0], keys, {strict: true, sensitive: true});
                regres = regexp.exec(ctx.path);

                if (regres) {
                    for (var key in keys) {
                        params[keys[key].name] = regres[parseInt(key) + 1];
                    }
                    index = router;
                    break;
                }
            }

            if (index) {
                const router = routers[index][1];
                if (lodash.isString(router)) {
                    path = router;
                    url = router + defaultUtil.urlObjToParam(parse(ctx.url).query, params);
                } else {
                    const routerMethod = router[method.toLowerCase()];
                    if (routerMethod) {
                        path = routerMethod;
                        url = routerMethod + defaultUtil.urlObjToParam(parse(ctx.url).query, params);
                    } else {
                        log('Not Found Router');
                        return;
                    }
                }

                return httpUtil.runAction(Object.assign(ctx, {originalPath: ctx.path, path: path, url: url}), next);
            } else {
                return httpUtil.runAction(ctx, next);
            }
        } else {
            return httpUtil.runAction(ctx, next);
        }
    };

    http.skip = skip;

    return http;
}

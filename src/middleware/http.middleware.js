import {parse as urlParse} from "url";
import pathToRegexp from "path-to-regexp";
import lodash from "lodash";
import skip from "./skip.middleware";
import {http as httpDebug} from "./../util/log.util";
import {runAction, urlObjToParam} from "./../util/http.util";

// run http
export function httpMiddleware() {

    const http = async function (ctx, next) {

        const routers = koahub.configs.router;

        let regexp, regres, key, url, path, method = ctx.method,
            params = [],
            keys = [];

        if (routers && routers.length) {
            for (let kk in routers) {
                regexp = pathToRegexp(routers[0], keys);
                regres = regexp.exec(ctx.path);

                if (regres) {
                    for (var k in keys) {
                        params[keys[k].name] = regres[parseInt(k) + 1];
                    }
                    key = kk;
                    break;
                }
            }

            const router = routers[key][1];
            if (lodash.isString(router)) {
                path = router;
                url = router + urlObjToParam(urlParse(ctx.url).query, params);
            } else {
                const routerMethod = router[method.toLowerCase()];
                if (routerMethod) {
                    path = routerMethod;
                    url = routerMethod + urlObjToParam(urlParse(ctx.url).query, params);
                } else {
                    httpDebug('Not Found Router');
                }
            }

            await runAction(Object.assign(ctx, {path: path, url: url}), next);
        } else {
            await runAction(ctx, next);
        }
    };

    http.skip = skip;

    return http;
}

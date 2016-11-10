import skip from "./skip.middleware";
import {runAction} from "./../util/http.util";

// run http
export function httpMiddleware() {

    const http = async function (ctx, next) {

        await runAction(ctx.path);

        await next();
    };

    http.skip = skip;

    return http;
}

import colors from "colors/safe";

export function debug(err) {

    if (koahub.configs.index.debug) {
        console.error(err);
    } else {
        console.log(err.message);
    }
}

export function http(err, code = 404) {

    if (koahub.configs.index.debug) {
        koahub.ctx.throw(err, code);
    } else {
        console.log(err);
    }
}

export function watch(path) {

    console.log(colors.green('[File Changed Server Restart] %s'), path);
}

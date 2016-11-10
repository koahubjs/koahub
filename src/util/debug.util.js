export default function (err) {

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


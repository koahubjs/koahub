import url from "url";

export default function (options) {
    const parent = this;

    const opts = typeof options === 'function' ? { custom: options } : options;
    opts.useOriginalUrl = typeof opts.useOriginalUrl === 'undefined' ? true : opts.useOriginalUrl;

    return function (ctx, next) {
        const requestedUrl = url.parse((opts.useOriginalUrl ? ctx.originalUrl : ctx.url) || '', true);

        let skip = false;

        if (opts.custom) {
            skip = skip || opts.custom(ctx);
        }

        const paths = !opts.path || Array.isArray(opts.path) ? opts.path : [opts.path];

        if (paths) {
            skip = skip || paths.some(function (p) {
                return typeof p === 'string' && p === requestedUrl.pathname || p instanceof RegExp && !!p.exec(requestedUrl.pathname);
            });
        }

        const exts = !opts.ext || Array.isArray(opts.ext) ? opts.ext : [opts.ext];

        if (exts) {
            skip = skip || exts.some(function (ext) {
                return requestedUrl.pathname.substr(ext.length * -1) === ext;
            });
        }

        const methods = !opts.method || Array.isArray(opts.method) ? opts.method : [opts.method];

        if (methods) {
            skip = skip || !!~methods.indexOf(ctx.method);
        }

        if (skip) {
            return next();
        }

        return parent(ctx, next);
    };
}
//# sourceMappingURL=skip.middleware.js.map
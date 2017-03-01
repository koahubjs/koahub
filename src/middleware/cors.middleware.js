export default function (options) {

    options = options || {};

    const defaults = {
        origin: true,
        methods: 'GET,HEAD,PUT,POST,DELETE'
    };

    // Set defaults
    for (let key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }

    // Set expose
    if (Array.isArray(options.expose)) {
        options.expose = options.expose.join(',');
    }

    // Set maxAge
    if (typeof options.maxAge === 'number') {
        options.maxAge = options.maxAge.toString();
    } else {
        options.maxAge = null;
    }

    // Set methods
    if (Array.isArray(options.methods)) {
        options.methods = options.methods.join(',');
    }

    // Set headers
    if (Array.isArray(options.headers)) {
        options.headers = options.headers.join(',');
    }

    return async function cors(ctx, next) {

        /**
         * Access Control Allow Origin
         */
        let origin;

        if (typeof options.origin === 'string') {
            origin = options.origin;
        } else if (options.origin === true) {
            origin = ctx.get('origin') || '*';
        } else if (options.origin === false) {
            origin = options.origin;
        } else if (typeof options.origin === 'function') {
            origin = options.origin(ctx.request);
        }

        if (origin === false) return;

        ctx.set('Access-Control-Allow-Origin', origin);

        /**
         * Access Control Expose Headers
         */
        if (options.expose) {
            ctx.set('Access-Control-Expose-Headers', options.expose);
        }

        /**
         * Access Control Max Age
         */
        if (options.maxAge) {
            ctx.set('Access-Control-Max-Age', options.maxAge);
        }

        /**
         * Access Control Allow Credentials
         */
        if (options.credentials === true) {
            ctx.set('Access-Control-Allow-Credentials', 'true');
        }

        /**
         * Access Control Allow Methods
         */
        ctx.set('Access-Control-Allow-Methods', options.methods);

        /**
         * Access Control Allow Headers
         */
        let headers;

        if (options.headers) {
            headers = options.headers;
        } else {
            headers = ctx.get('access-control-request-headers');
        }

        if (headers) {
            ctx.set('Access-Control-Allow-Headers', headers);
        }

        /**
         * Returns
         */
        if (ctx.method === 'OPTIONS') {
            ctx.status = 204;
        } else {
            await next();
        }
    };
}
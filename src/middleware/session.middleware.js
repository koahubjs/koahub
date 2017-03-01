import uid from "uid-safe";

class Store {
    constructor() {
        this.session = {};
    }

    decode(string) {
        if (!string) return "";

        let session = "";

        try {
            session = new Buffer(string, "base64").toString();
        } catch (e) {
        }

        return JSON.parse(session);
    }

    encode(obj) {
        return new Buffer(obj).toString("base64");
    }

    getID(length) {
        return uid.sync(length);
    }

    async get(sid) {
        return this.decode(this.session[sid]);
    }

    async set(session, options) {
        options = options || {};
        let sid = options.sid;
        if (!sid) {
            sid = this.getID(24);
        }

        this.session[sid] = this.encode(JSON.stringify(session));

        return sid;
    }

    async destroy(sid) {
        delete this.session[sid];
    }
}

export default function (options = {}) {

    options.key = options.key || "koa:sess";
    options.store = options.store || new Store();

    return async function (ctx, next) {
        let id = ctx.cookies.get(options.key, options);

        if (!id) {
            ctx.session = {};
        } else {
            ctx.session = await options.store.get(id);
            // check session should be a no-null object
            if (typeof ctx.session !== "object" || ctx.session == null) {
                ctx.session = {};
            }
        }

        let old = JSON.stringify(ctx.session);

        await next();

        // if not changed
        if (old == JSON.stringify(ctx.session)) return;

        // clear old session if exists
        if (id) {
            await options.store.destroy(id);
            id = null;
        }

        // set new session
        if (ctx.session && Object.keys(ctx.session).length) {
            let sid = await options.store.set(ctx.session, Object.assign({}, options, {sid: id}));
            ctx.cookies.set(options.key, sid, options);
        }
    }
}
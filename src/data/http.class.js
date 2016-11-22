export default class {

    constructor(ctx) {
        if (ctx == undefined) {
            throw new Error('SyntaxError: missing super(ctx) call in constructor');
            return;
        }
        this.ctx = ctx;
    }

    method() {
        return this.ctx.method;
    }

    isGet() {
        if (this.ctx.method == 'GET') {
            return true;
        }
        return false;
    }

    isPost() {
        if (this.ctx.method == 'POST') {
            return true;
        }
        return false;
    }

    isAjax() {
        return this.header('X-Requested-With') === 'XMLHttpRequest';
    }

    isPjax() {
        return this.header('X-PJAX') || false;
    }

    isMethod(method) {
        return this.ctx.method === method.toUpperCase();
    }

    ip() {
        return this.ctx.ip;
    }

    header(name, value) {
        if (value != undefined) {
            this.ctx.set(name, value);
        } else {
            return this.ctx.get(name);
        }
    }

    status(code) {
        if (code != undefined) {
            this.ctx.status = code;
        } else {
            return this.ctx.status;
        }
    }

    get(name) {
        if (name != undefined) {
            return this.ctx.query[name];
        } else {
            return this.ctx.query;
        }
    }

    post(name) {
        if (name != undefined) {
            return this.ctx.post[name];
        } else {
            return this.ctx.post;
        }
    }

    file(name) {
        if (name != undefined) {
            return this.ctx.file[name];
        } else {
            return this.ctx.file;
        }
    }

    session(name, value) {
        if (name != undefined) {
            if (value != undefined) {
                this.ctx.session[name] = value;
            } else {
                return this.ctx.session[name];
            }
        } else {
            return this.ctx.session;
        }
    }

    cookie() {
        return {
            get: function (name, options) {
                return this.ctx.cookies.get(name, options);
            },
            set: function (name, value, options) {
                return this.ctx.cookies.set(name, value, options);
            }
        }
    }

    state(name, value) {
        if (name != undefined) {
            if (value != undefined) {
                this.ctx.state[name] = value;
            } else {
                return this.ctx.state[name];
            }
        } else {
            return this.ctx.state;
        }
    }

    host() {
        return this.ctx.host;
    }

    redirect(url) {
        this.ctx.redirect(url);
    }

    view(data) {
        this.ctx.body = data;
    }

    json(data, msg, code) {

        let body = {};

        if (data != undefined) {
            body.data = data;
        }
        if (msg != undefined) {
            body.msg = msg;
        }
        if (code != undefined) {
            body.code = code;
        }

        this.ctx.body = body;
    }

    async render(tpl, locals) {
        await this.ctx.render(tpl, locals);
    }
}
export default class {

    constructor(ctx, next) {

        if (arguments.length === 0) {
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

        switch (arguments.length) {
            case 1:
                return this.ctx.get(name);
            case 2:
                this.ctx.set(name, value);
        }
    }

    status(code) {

        switch (arguments.length) {
            case 0:
                return this.ctx.status;
            case 1:
                this.ctx.status = code;
        }
    }

    get(name, value) {

        switch (arguments.length) {
            case 0:
                return this.ctx.query;
            case 1:
                return this.ctx.query[name];
            case 2:
                this.ctx.query[name] = value;
        }
    }

    post(name, value) {

        switch (arguments.length) {
            case 0:
                return this.ctx.post;
            case 1:
                return this.ctx.post[name];
            case 2:
                this.ctx.post[name] = value;
        }
    }

    file(name, value) {

        switch (arguments.length) {
            case 0:
                return this.ctx.file;
            case 1:
                return this.ctx.file[name];
            case 2:
                this.ctx.file[name] = value;
        }
    }

    session(name, value) {

        switch (arguments.length) {
            case 0:
                return this.ctx.session;
            case 1:
                return this.ctx.session[name];
            case 2:
                this.ctx.session[name] = value;
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

        switch (arguments.length) {
            case 0:
                return this.ctx.state;
            case 1:
                return this.ctx.state[name];
            case 2:
                this.ctx.state[name] = value;
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

        switch (arguments.length) {
            case 1:
                body = {
                    data: data,
                }
                break;
            case 2:
                body = {
                    data: data,
                    msg: msg,
                }
                break;
            case 3:
                body = {
                    data: data,
                    msg: msg,
                    code: code
                }
                break;
        }

        this.ctx.body = body;
    }

    async render(tpl, locals) {
        await this.ctx.render(tpl, locals);
    }
}
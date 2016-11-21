export default class {

    constructor() {

    }

    method() {
        return koahub.ctx.method;
    }

    isGet() {
        if (koahub.ctx.method == 'GET') {
            return true;
        }
        return false;
    }

    isPost() {
        if (koahub.ctx.method == 'POST') {
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
        return koahub.ctx.method === method.toUpperCase();
    }

    ip() {
        return koahub.ctx.ip;
    }

    header(name, value) {
        if (value != undefined) {
            koahub.ctx.set(name, value);
        } else {
            return koahub.ctx.get(name);
        }
    }

    status(code) {
        if (code != undefined) {
            koahub.ctx.status = code;
        } else {
            return koahub.ctx.status;
        }
    }

    get(name) {
        if (name != undefined) {
            return koahub.ctx.query[name];
        } else {
            return koahub.ctx.query;
        }
    }

    post(name) {
        if (name != undefined) {
            return koahub.ctx.post[name];
        } else {
            return koahub.ctx.post;
        }
    }

    file(name) {
        if (name != undefined) {
            return koahub.ctx.file[name];
        } else {
            return koahub.ctx.file;
        }
    }

    session(name, value) {
        if (name != undefined) {
            if (value != undefined) {
                koahub.ctx.session[name] = value;
            } else {
                return koahub.ctx.session[name];
            }
        } else {
            return koahub.ctx.session;
        }
    }

    cookie() {
        return {
            get: function (name, options) {
                return koahub.ctx.cookies.get(name, options);
            },
            set: function (name, value, options) {
                return koahub.ctx.cookies.set(name, value, options);
            }
        }
    }

    state(name, value) {
        if (name != undefined) {
            if (value != undefined) {
                koahub.ctx.state[name] = value;
            } else {
                return koahub.ctx.state[name];
            }
        } else {
            return koahub.ctx.state;
        }
    }

    host() {
        return koahub.ctx.host;
    }

    redirect(url) {
        koahub.ctx.redirect(url);
    }

    view(data) {
        koahub.ctx.body = data;
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

        koahub.ctx.body = body;
    }

    async render(tpl, locals) {
        await koahub.ctx.render(tpl, locals);
    }
}
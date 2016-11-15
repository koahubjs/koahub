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
        if (value) {
            koahub.ctx.set(name, value);
        } else {
            return koahub.ctx.get(name);
        }
    }

    status(code) {
        if (code) {
            koahub.ctx.status = code;
        } else {
            return koahub.ctx.status;
        }
    }

    get(name) {
        return koahub.ctx.query[name];
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

    json(data, msg = '') {
        koahub.ctx.body = {
            data: data,
            msg: msg
        };
        koahub.ctx.body.code = koahub.ctx.status;
    }
}
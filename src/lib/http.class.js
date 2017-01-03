import fs from "fs";
import path from "path";
import {runAction} from "./../util/http.util";

export default class {

    constructor(ctx, next) {

        if (arguments.length == 0) {
            throw new Error('SyntaxError: missing super(ctx) call in constructor');
            return;
        }
        if (arguments.length == 1) {
            throw new Error('SyntaxError: missing super(next) call in constructor');
            return;
        }
        this.ctx = ctx;
        this.next = next;
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

                if (name == null) {
                    this.ctx.query = {};
                    break;
                }
                return this.ctx.query[name];
            case 2:

                if (value == null) {
                    delete this.ctx.query[name];
                    break;
                }
                this.ctx.query[name] = value;
        }
    }

    post(name, value) {

        switch (arguments.length) {
            case 0:
                return this.ctx.post;
            case 1:

                if (name == null) {
                    this.ctx.post = {};
                    break;
                }
                return this.ctx.post[name];
            case 2:

                if (value == null) {
                    delete this.ctx.post[name];
                    break;
                }
                this.ctx.post[name] = value;
        }
    }

    file(name, value) {

        switch (arguments.length) {
            case 0:
                return this.ctx.file;
            case 1:

                if (name == null) {
                    this.ctx.file = {};
                    break;
                }
                return this.ctx.file[name];
            case 2:

                if (value == null) {
                    delete this.ctx.file[name];
                    break;
                }
                this.ctx.file[name] = value;
        }
    }

    session(name, value) {

        switch (arguments.length) {
            case 0:
                return this.ctx.session;
            case 1:

                if (name == null) {
                    this.ctx.session = {};
                    break;
                }
                return this.ctx.session[name];
            case 2:

                if (value == null) {
                    delete this.ctx.session[name];
                    break;
                }
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

                if (name == null) {
                    this.ctx.state = {};
                    break;
                }
                return this.ctx.state[name];
            case 2:

                if (value == null) {
                    delete this.ctx.state[name];
                    break;
                }
                this.ctx.state[name] = value;
        }
    }

    host() {
        return this.ctx.host;
    }

    redirect(url) {
        this.ctx.redirect(url);
    }

    download(file) {

        const filename = path.relative(path.dirname(file), file);

        this.header('Content-disposition', 'attachment; filename=' + filename);
        this.view(fs.createReadStream(file));
    }

    async action(path, ...args) {
        return await runAction(Object.assign(this.ctx, {path: path}), this.next, false, ...args);
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

    success(data, msg) {
        this.json(data, msg, 1);
    }

    error(data, msg) {
        this.json(data, msg, 0);
    }

    async render(tpl, locals) {
        await this.ctx.render(tpl, locals);
    }
}

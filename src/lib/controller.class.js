import fs from "fs";
import path from "path";
import {runAction} from "./../util/http.util";

export default class Controller {

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

        for (let name in ctx) {
            if (typeof ctx[name] !== 'function') {
                Object.defineProperty(this, name, {
                    get: () => {
                        return this.ctx[name];
                    },
                    set: value => {
                        this.ctx[name] = value;
                    }
                });
            } else {
                this[name] = ctx[name];
            }
        }
    }

    get hook() {

        if (koahub.config('hook')) {
            return koahub.hook;
        }
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
        return this.ctx.get('X-Requested-With') === 'XMLHttpRequest';
    }

    isPjax() {
        return this.ctx.get('X-PJAX') || false;
    }

    isMethod(method) {
        return this.ctx.method === method.toUpperCase();
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

        this.view(body);
    }

    success(data, msg) {
        this.json(data, msg, 1);
    }

    error(data, msg) {
        this.json(data, msg, 0);
    }

    download(file) {

        const filename = path.relative(path.dirname(file), file);

        this.ctx.set('Content-disposition', 'attachment; filename=' + filename);
        this.view(fs.createReadStream(file));
    }

    async action(path, ...args) {
        return await runAction(Object.assign(this.ctx, {path: path}), this.next, ...args);
    }
}
const fs = require('fs');
const co = require('co');
const path = require('path');
const assert = require('assert');
const Hook = require('./../lib/hook.class');
const common = require('./../common');

module.exports = class Controller {

    constructor(ctx, next) {

        assert(ctx, 'SyntaxError: missing super(ctx) call in constructor');
        assert(next, 'SyntaxError: missing super(next) call in constructor');

        this.ctx = ctx;
        this.next = next;
        this.hook = new Hook(ctx, next);

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
                if (common.isGeneratorFunction(ctx[name])) {
                    this[name] = co.wrap(ctx[name]).bind(ctx);
                } else {
                    this[name] = ctx[name];
                }
            }
        }
    }

    isGet() {

        if (this.ctx.method === 'GET') {
            return true;
        }
        return false;
    }

    isPost() {

        if (this.ctx.method === 'POST') {
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
        return await common.runHttp(Object.assign(this.ctx, {path: path}), this.next, ...args);
    }
}
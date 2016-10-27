export default class {

    constructor() {

    }

    isGet() {
        if (ctx.method == 'GET') {
            return true;
        }
        return false;
    }

    isPost() {
        if (ctx.method == 'POST') {
            return true;
        }
        return false;
    }

    view(data) {
        ctx.body = data;
    }

    json(data, msg = '') {
        ctx.body = {
            data: data,
            msg: msg
        };
        ctx.body.code = ctx.status;
    }
}
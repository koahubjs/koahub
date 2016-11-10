export default class {

    constructor() {

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
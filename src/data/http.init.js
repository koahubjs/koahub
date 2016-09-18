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

    view() {

    }

    json(data) {
        koahub.ctx.body = data;
    }
}
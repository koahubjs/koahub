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

    view() {

    }

    json(data) {
        ctx.body = data;
    }
}
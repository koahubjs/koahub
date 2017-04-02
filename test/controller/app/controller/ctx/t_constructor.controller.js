module.exports = class extends koahub.controller {

    constructor(ctx, next) {
        super(ctx, next);
        ctx.body = 'Hello Constructor!';
    }

    index() {
        this.view('Hello World!');
    }
}

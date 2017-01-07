export default class extends koahub.http {

    constructor(ctx, next) { //构造函数
        super(ctx, next);
    }

    index() {
        super.view('Hello World!');
    }
}

export default class extends koahub.http {

    constructor(ctx, next) { //构造函数
        super(ctx);
    }

    index() {
        super.view(1);
    }

    index2() {
        super.json(1, 2, 3);
    }
}

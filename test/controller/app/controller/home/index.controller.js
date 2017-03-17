module.exports = class extends koahub.controller {

    _initialize() {
        // 控制器初始化
    }

    index() {
        this.view('Hello World!');
    }

    *index2() {
        this.view('Hello World!');
    }

    index3(a, b) {
        return a + b;
    }

    async index4() {
        this.body = await this.action('/home/index/index3', 1, 2);
    }

    index5() {
        this.view(koahub.config());
    }

    index6() {

        koahub.config('id', 1);
        this.view(koahub.config('id'));
    }

    message() {
        // error
    }
}

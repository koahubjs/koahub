export default class extends koahub.controller {

    async _initialize() {
        // 控制器初始化
    }

    async index() {
        this.view('Hello World!');
    }

    *index2() {
        this.view('Hello World!');
    }

    index3(a, b){
        return a + b;
    }

    async index4() {
        this.body = await this.action('/home/index/index3', 1, 2);
    }

    async index5() {
        this.view(koahub.config());
    }

    async index6() {

        koahub.config('a', 1);
        this.view(koahub.config('a'));
    }
}

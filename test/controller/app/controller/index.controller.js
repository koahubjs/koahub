module.exports = class extends koahub.controller {

    _initialize() {
        // 控制器初始化
    }

    async index() {
        this.view('Hello World!');
    }
}
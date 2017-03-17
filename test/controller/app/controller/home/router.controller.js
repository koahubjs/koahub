module.exports = class extends koahub.controller {

    _initialize() {
        // 控制器初始化
    }

    index() {
        this.view('Hello World!');
    }

    detail() {
        this.view(this.query.id);
    }
}

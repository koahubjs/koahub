export default class extends koahub.controller {

    async _initialize() {
        // 控制器初始化
    }

    async index() {
        this.view('Hello World!');
    }

}

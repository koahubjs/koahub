export default class extends koahub.http {

    async _initialize() {
        // 控制器初始化
    }

    async index() {
        super.view('Hello World!');
    }
}

import path from "path";

export default class extends koahub.controller {

    async _initialize() {
        // 控制器初始化
    }

    async is_get() {
        this.view(this.isGet());
    }

    async is_post() {
        this.view(this.isPost());
    }

    async is_ajax() {
        this.view(this.isAjax());
    }

    async is_pjax() {
        this.view(this.isPjax());
    }

    async is_method() {
        this.view(this.isMethod('get'));
    }

    async gen() {
        this.view(await this.render(1, 2));
    }

    async json_body() {
        this.json(1);
    }

    async json_body_msg() {
        this.json(1, 2);
    }

    async json_body_msg_code() {
        this.json(1, 2, 3);
    }

    async json_success() {
        this.success(1, 2);
    }

    async json_error() {
        this.error(1, 2);
    }

    async download_file() {

        const file = path.resolve(__dirname, './../../../www/file.zip');
        this.download(file);
    }
}

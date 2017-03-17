const path = require('path');

module.exports = class extends koahub.controller {

    _initialize() {
        // 控制器初始化
    }

    is_get() {
        this.view(this.isGet());
    }

    is_post() {
        this.view(this.isPost());
    }

    is_post_id() {
        this.view(this.post.id);
    }

    is_ajax() {
        this.view(this.isAjax());
    }

    is_pjax() {
        this.view(this.isPjax());
    }

    is_method() {
        this.view(this.isMethod('get'));
    }

    async gen() {
        this.view(await this.render(1, 2));
    }

    json_body() {
        this.json(1);
    }

    json_body_msg() {
        this.json(1, 2);
    }

    json_body_msg_code() {
        this.json(1, 2, 3);
    }

    json_success() {
        this.success(1, 2);
    }

    json_error() {
        this.error(1, 2);
    }

    download_file() {

        const file = path.resolve(__dirname, './../../../www/file.zip');
        this.download(file);
    }
}

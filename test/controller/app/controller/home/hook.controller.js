const lodash = require('lodash');

module.exports = class extends koahub.controller {

    _initialize() {
        // 控制器初始化
    }

    http1() {

        this.hook.add('hook1', '/home/index/index');

        this.view(lodash.isEqual(this.hook.get('hook1'), ['/home/index/index']));
    }

    async http1run() {

        this.hook.add('hook1', '/home/index/index');

        await this.hook.run('hook1');
    }

    http2same() {

        this.hook.add('hook1', '/home/index/index');
        this.hook.add('hook1', '/home/index/index');

        this.view(lodash.isEqual(this.hook.get('hook1'), ['/home/index/index', '/home/index/index']));
    }

    http2diff() {

        this.hook.add('hook1', '/home/index/index');
        this.hook.add('hook2', '/home/index/index2');

        this.view(lodash.isEqual(this.hook.get('hook1'), ['/home/index/index']));
    }

    http2all() {

        this.hook.add('hook1', '/home/index/index');
        this.hook.add('hook2', '/home/index/index2');

        this.view(lodash.isEqual(this.hook.get(), {hook1: ['/home/index/index'], hook2: ['/home/index/index2']}));
    }

    async fun1() {

        this.hook.add('hook1', (a, b) => {
            this.view(a + b);
        });

        await this.hook.run('hook1', 1, 2);
    }
}

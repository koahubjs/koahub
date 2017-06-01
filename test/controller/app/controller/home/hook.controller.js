const lodash = require('lodash');

module.exports = class extends koahub.controller {

    _initialize() {
        // 控制器初始化
    }

    async fun1() {

        this.hook.add('hook1', (a, b) => {
            this.view(a + b);
        });

        await this.hook.run('hook1', 1, 2);
    }

    async fun2() {

        this.hook.add('hook1', (a, b) => {
            this.view(a + b);
        });

        this.view(lodash.isEqual(this.hook.get('hook1').toString(), ((a, b) => {
            this.view(a + b);
        }).toString()));
    }
}

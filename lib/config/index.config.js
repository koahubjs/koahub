'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    //启动端口
    port: 3000,

    //项目目录
    app_path: 'app',

    //默认模块，控制器，操作
    default_module: 'home',
    default_controller: 'index',
    default_action: 'index',

    //http日志
    log_on: true,

    //favicon设置
    favicon: 'www/public/favicon.ico',

    //自动加载配置
    loader: {
        "controller": [{
            root: 'app/controller',
            suffix: '.controller.js',
            prefix: '/'
        }, {
            root: 'app/addon',
            suffix: '.controller.js',
            prefix: '/addon/',
            filter: [/\w*\/controller\//]
        }],
        "util": [{
            root: 'app/util',
            suffix: '.util.js'
        }, {
            root: 'app/addon',
            suffix: '.util.js',
            filter: [/\w*\/util\//]
        }],
        "model": [{
            root: 'app/model',
            suffix: '.model.js'
        }, {
            root: 'app/addon',
            suffix: '.model.js',
            filter: [/\w*\/model\//]
        }],
        "config": [{
            root: 'app/config',
            suffix: '.config.js'
        }, {
            root: 'app/addon',
            suffix: '.config.js',
            filter: [/\w*\/config\//]
        }]
    }
};
//# sourceMappingURL=index.config.js.map
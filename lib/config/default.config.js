'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    //启动端口
    port: 3000,

    //默认模块，控制器，操作
    default_module: 'home',
    default_controller: 'index',
    default_action: 'index',

    //favicon设置
    favicon: 'www/favicon.ico',

    //http日志
    logger: true,

    //url后缀
    url_suffix: '',

    //body配置
    body: {
        multipart: true
    },

    //cors配置
    cors: false,

    //session配置
    session: false,

    //static配置
    static: false,

    //自动加载配置
    loader: {
        "controllers": [{
            root: 'controller',
            suffix: '.controller.js',
            prefix: '/'
        }, {
            root: 'addon',
            suffix: '.controller.js',
            prefix: '/addon/',
            filter: [/\/controller/]
        }],
        "configs": {
            root: 'config',
            suffix: '.config.js'
        }
    }
};
//# sourceMappingURL=default.config.js.map
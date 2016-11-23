'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// 默认配置
exports.default = {

    //项目目录
    app: 'app',

    //缓存目录
    runtime: 'runtime',

    //自动加载配置
    loader: {
        "controller": [{
            root: 'runtime/controller',
            suffix: '.controller.js',
            prefix: '/'
        }, {
            root: 'runtime/addon',
            suffix: '.controller.js',
            prefix: '/addon/',
            filter: [/\w*\/controller\//]
        }],
        "util": [{
            root: 'runtime/util',
            suffix: '.util.js'
        }, {
            root: 'runtime/addon',
            suffix: '.util.js',
            filter: [/\w*\/util\//]
        }],
        "model": [{
            root: 'runtime/model',
            suffix: '.model.js'
        }, {
            root: 'runtime/addon',
            suffix: '.model.js',
            filter: [/\w*\/model\//]
        }],
        "service": [{
            root: 'runtime/service',
            suffix: '.service.js'
        }, {
            root: 'runtime/addon',
            suffix: '.service.js',
            filter: [/\w*\/service\//]
        }],
        "config": [{
            root: 'runtime/config',
            suffix: '.config.js'
        }, {
            root: 'runtime/addon',
            suffix: '.config.js',
            filter: [/\w*\/config\//]
        }]
    }
};
//# sourceMappingURL=default.config.js.map
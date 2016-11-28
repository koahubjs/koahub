// 默认配置
export default {

    //项目目录
    app: 'app',

    //缓存目录
    runtime: 'runtime',

    //自动加载配置
    loader: {
        "controller": [{
            root: 'runtime/controller',
            suffix: '.controller.js',
            prefix: '/',
        }, {
            root: 'runtime/addon',
            suffix: '.controller.js',
            prefix: '/addon/',
            filter: [/\w*\/controller\//]
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
}
// 默认配置
export default {

    //项目目录
    app_path: 'app',

    //自动加载配置
    loader: {
        "controller": [{
            root: 'app/controller',
            suffix: '.controller.js',
            prefix: '/',
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
        "service": [{
            root: 'app/service',
            suffix: '.service.js'
        }, {
            root: 'app/addon',
            suffix: '.service.js',
            filter: [/\w*\/service\//]
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
}
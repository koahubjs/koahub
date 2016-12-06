export default {

    //项目目录, 不允许覆盖
    app: 'app',

    //缓存目录, 不允许覆盖
    runtime: 'runtime',

    //启动端口
    port: 3000,

    //调试模式
    debug: true,

    //默认模块，控制器，操作
    default_module: 'home',
    default_controller: 'index',
    default_action: 'index',

    //favicon设置
    favicon: 'www/public/favicon.ico',

    //hook中间件
    hook: true,

    //http日志
    logger: true,

    //监控文件，自动重启系统（需开启babel编译监控）
    watcher: true,

    //自动加载配置
    loader: {
        "controllers": [{
            root: 'runtime/controller',
            suffix: '.controller.js',
            prefix: '/',
        }, {
            root: 'runtime/addon',
            suffix: '.controller.js',
            prefix: '/addon/',
            filter: [/\w*\/controller\//]
        }],
        "models": [{
            root: 'runtime/model',
            suffix: '.model.js'
        }, {
            root: 'runtime/addon',
            suffix: '.model.js',
            filter: [/\w*\/model\//]
        }],
        "services": [{
            root: 'runtime/service',
            suffix: '.service.js'
        }, {
            root: 'runtime/addon',
            suffix: '.service.js',
            filter: [/\w*\/service\//]
        }],
        "configs": [{
            root: 'runtime/config',
            suffix: '.config.js'
        }, {
            root: 'runtime/addon',
            suffix: '.config.js',
            filter: [/\w*\/config\//]
        }]
    }
}
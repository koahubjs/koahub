module.exports = {

    //启动端口
    port: 3000,

    //默认模块，控制器，操作
    default_module: 'home',
    default_controller: 'index',
    default_action: 'index',

    //url后缀
    url_suffix: '',

    //自动加载配置
    loader: {
        "controllers": {
            root: 'controller',
            suffix: '.controller.js',
            prefix: '/',
        },
        "configs": {
            root: 'config',
            suffix: '.config.js'
        },
        "middlewares": {
            root: 'middleware',
            suffix: '.middleware.js'
        }
    }
}
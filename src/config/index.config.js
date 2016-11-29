// 允许覆盖
export default {

    //启动端口，重启生效
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

    //监控文件，自动重启系统（需开启babel编译监控），重启生效
    watcher: true,

    //cluster，重启生效
    cluster: false
}
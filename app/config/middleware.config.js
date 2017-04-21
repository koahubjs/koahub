module.exports = {

    //middleware顺序
    middleware: ['logger', 'common', 'body', 'session'],

    //http日志
    logger: true,

    //favicon设置
    favicon: 'www/favicon.ico',

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

    //common配置
    common: true
}
module.exports = {

    //middleware顺序
    middleware: ['koa-logger'],

    //http日志
    'koa-logger': true,

    //favicon设置
    'koa-favicon': 'www/favicon.ico',

    //body配置
    body: {
        multipart: true
    },

    //cors配置
    'koa-cors': false,

    //session配置
    'koa-session2': false,

    //static配置
    'koa-static-cache': false
}
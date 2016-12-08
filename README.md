## 介绍

KoaHub.js -- 基于 Koa.js 平台的 Node.js web 快速开发框架。可以直接在项目里使用 ES6/7（Generator Function, Class, Async & Await）等特性，借助 Babel 编译，可稳定运行在 Node.js 环境上。


```javascript
//base controller, admin/controller/base.controller.js
export default class extends koahub.http{

    constructor(ctx, next) {
        super(ctx, next);
        console.log('base constructor');
    }

    isLogin() {
        console.log('base isLogin');
    }
}

//index controller, admin/controller/index.controller.js
import base from "./base.controller";
export default class extends base{

    constructor(ctx, next) {
        super(ctx, next);
        console.log('index constructor');
    }

    index() {
        super.view(1);
    }
    
    index2() {
        super.json(1,2);
    }
    
    async index3() {
        await super.render('index');
    }
}
```

项目中可以使用 ES6/7 里的所有特性，借助 Babel 编译，可以稳定运行在 >=0.12.0 的 Node.js 环境中。

## 特性

* 支持koa全部中间件
* 支持使用 ES2015+ 全部特性来开发项目
* 支持断点调试 ES2015+ 项目
* 支持多种项目结构和多种项目环境
* 支持多级 Controller
* 支持自动加载
* 支持钩子机制
* 支持Socket.io
* 支持错误处理
* 支持全局koahub变量
* 支持快捷方法
* 支持修改代码，立即生效
* ...

## 安装

```javascript
npm install koahubjs --save
```

## 创建启动文件

```javascript
// app/index.js启动文件
import Koahub from "koahubjs";

//默认app是项目目录
const app = new Koahub();

app.getKoa();获取koa实例化，支持自定义koa中间件
app.getServer();获取server实例化，支持socket.io

app.run();
```

## 方法

```javascript
super.method();
super.isGet();
super.isPost();
super.isAjax();
super.isPjax();
super.isMethod(method);
super.ip();
super.header(name, value);
super.status(code);
super.get(name, value);
super.post(name, value);//需中间件，且快捷方法
super.file(name, value);//需中间件，且快捷方法
super.session(name, value);//需session中间件
super.cookie().get(name, options);
super.cookie().set(name, value, options);
super.host();
super.redirect(url);
super.view(data);
super.json(data, msg, code);
super.state(name, value);
await super.render(tpl, locals);//需中间件
```

## 快捷中间件

```javascript
// use koa-better-body 自定义post／file中间件
koa.use(async function (ctx, next) {

    if (ctx.request.fields) {
        ctx.post = ctx.request.fields;
    }

    if (ctx.request.files) {
        ctx.file = ctx.request.files;
    }

    await next();
});

// 自定义utils.model快捷中间件
koa.use(async function (ctx, next) {

    if (!global.model && koahub.utils.model) {
        global.model = koahub.utils.model;
    }

    await next();
});
```

## 目录结构

```javascript
// 推荐目录结构
node_modules
app
--addon
--config
--controller
--data
--model
--service
--util
--index.js
package.json
```

## 命令行工具
```javascript
koahub

Usage: koahub [options] [command]

Commands:

start [options] [script]  koahub start script --watch --compile
controller [name]         koahub create controller
create [project]          koahub create project

Options:

-h, --help     output usage information
-V, --version  output the version number

Examples:

koahub start app/index.js --watch --compile (文件修改自动编译并且重启）
koahub controller home/article (自动创建控制器模版）
koahub create koahub-demo (自动初始化项目)
```

## 配置
```javascript
// app/config/index.config.js
export default {
    port: 3000,
    default_module: 'admin'
}

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

//自动加载配置 such as koahub.utils
loader: {
    "utils": [{
        root: 'runtime/util',
        suffix: '.util.js'
    }, {
        root: 'runtime/addon',
        suffix: '.util.js',
        prefix: '/',
        filter: [/\w*\/util\//]
    }]
}
```

## 开始应用

```javascript
git clone https://github.com/einsqing/koahubjs-demo.git
cd koahubjs-demo
npm install
npm start
```

## 启动信息:

```javascript
[2016-11-28 09:56:03] [Koahubjs] Koahubjs version: 0.8.3
[2016-11-28 09:56:03] [Koahubjs] Koahubjs website: http://js.koahub.com
[2016-11-28 09:56:03] [Koahubjs] Server Enviroment: development
[2016-11-28 09:56:03] [Koahubjs] Server running at: http://127.0.0.1:3000
```

## 使用手册
[KoaHub.js手册](https://github.com/einsqing/koahubjs/wiki)

## 官网
[KoaHub.js官网](http://js.koahub.com)

## KoaHub.js

[![license](https://img.shields.io/github/license/koahubjs/koahub.svg?style=flat-square)](http://js.koahub.com)
[![travis-ci](https://img.shields.io/travis/koahubjs/koahub.svg?style=flat-square)](https://travis-ci.org/koahubjs/koahub)
[![codecov](https://codecov.io/gh/koahubjs/koahub/branch/master/graph/badge.svg)](https://codecov.io/gh/koahubjs/koahub)
[![Dependency Status](https://img.shields.io/david/koahubjs/koahub.svg?style=flat-square)](https://david-dm.org/koahubjs/koahub)

KoaHub.js -- 中文最佳实践Node.js Web快速开发框架。支持Koa.js, Express.js中间件。

```javascript
//base controller, admin/controller/base.controller.js
module.exports = class extends koahub.controller {

    async _initialize() {
        console.log('base _initialize');
    }

    async isLogin() {
        console.log('base isLogin');
    }
}

//index controller, admin/controller/index.controller.js
const base = require('./base.controller');
module.exports = class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {
        this.view(1);
    }

    async index2() {
        this.json(1, 2);
    }

    async index3() {
        await this.render('index');
    }
}
```
环境要求：Node.js >= 7.6.0


## 特性

* 支持koa全部中间件
* 支持使用 ES6+ 全部特性来开发项目
* 支持断点调试 ES6+ 项目
* 支持多种项目结构和多种项目环境
* 支持 Controller 中使用Koa.js的所有API
* 支持多级 Controller
* 支持自动加载
* 支持钩子机制
* 支持 Socket.io
* 支持错误处理
* 支持全局koahub变量
* 支持快捷方法
* 支持修改代码，立即生效
* 支持前置，后置，空操作
* 支持禁用控制器方法
* 支持 Restful 设计
* 支持 Common 自动加载
* ...

## 安装

```sh
npm install koahubjs/koahub --save
```

## 创建启动文件

```javascript
// app/index.js启动文件
const Koahub = require('koahub');

// 初始化项目
const app = new Koahub();

// 启动项目
app.run();
```

## 方法

ctx上的函数或参数将自动加载到controller，例如支持 `this.body = 'Hello World!'`, ctx中具体的API请参考Koa.js, controller中的扩展方法如下。

```javascript
this.ctx;
this.next;
this.isGet();
this.isPost();
this.isAjax();
this.isPjax();
this.isMethod(method);
this.hook.add(name, action);
await this.hook.run(name, ...args);
this.download(file);
this.view(data);
this.json(data, msg, code);
this.success(data, msg);
this.error(data, msg);
await this.action(path, ...args);
```

## 快捷方法

```javascript
// app/common.js 函数文件
module.exports = {
    add(a, b){
        return a + b;
    }
}
// 控制器中可以直接通过this.add调用
```

## 快捷中间件

```javascript
app.use(async function (ctx, next) {

    ctx.model = function() {
        // ....
    }
    await next();
});

// 控制器中可以直接通过this.model调用
```


## 命令行工具
[KoaHub CLI](https://github.com/koahubjs/koahub-cli)

## 配置
```javascript
// app/config/default.config.js
module.exports = {
    port: 3000,
    default_module: 'admin'
}

//框架默认配置
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

//中间件默认配置
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
```

## 其他
```javascript
// 控制器初始化，前置，后置，空操作
async _initialize()
async _before()
async _before_index()
async index()
async _after_index()
async _after()
async _empty()

// 控制器私有方法
// 方法首页字符是`_`为私有方法

// 支持restful路由设置
// app/config/router.config.js
module.exports = [
    ['/product', {
        get: "/home/product/index"
    }],
    ['/product/:id', {
        get: "/home/product/detail",
        post: "/home/product/add",
        put: "/home/product/update",
        delete: "/home/product/delete",
    }]
]
```


## 开始应用

### async/await
```sh
// 下载demo
git clone https://github.com/koahubjs/koahub-demo.git
// 进入项目
cd koahub-demo
// 安装依赖
npm install
// 启动项目
npm start
```

### promise
```sh
// 下载demo
git clone https://github.com/koahubjs/koahub-demo-promise.git
// 进入项目
cd koahub-demo-promise
// 安装依赖
npm install
// 启动项目
npm start
```

### generator
```sh
// 下载demo
git clone https://github.com/koahubjs/koahub-demo-generator.git
// 进入项目
cd koahub-demo-generator
// 安装依赖
npm install
// 启动项目
npm start
```

## 启动信息

```text
[2016-11-28 09:56:03] [Koahub] Koahub Version: 2.2.0
[2016-11-28 09:56:03] [Koahub] Koahub Website: http://js.koahub.com
[2016-11-28 09:56:03] [Koahub] Server Enviroment: development
[2016-11-28 09:56:03] [Koahub] Server running at: http://127.0.0.1:3000
```


## 使用手册
[KoaHub.js手册](http://js.koahub.com/public/docs/index.html)

## 官网
[KoaHub.js官网](http://js.koahub.com)
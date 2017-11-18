## 快速入门

### 介绍

#### 简介

​	KoaHub.js -- 中文最佳实践Node.js Web快速开发框架。支持Koa.js, Express.js中间件，支持自动加载，可以直接在项目里使用 ES6/7（Generator Function, Class, Async & Await）等特性，借助 Babel 编译，可稳定运行在 Node.js 环境上。同时吸收了thinkphp，laravel等国内外众多框架的设计理念和思想，让开发 Node.js 项目更加简单、高效、灵活。

​	使用 ES6/7 特性来开发项目可以大大提高开发效率，是趋势所在。并且新版的 Node.js 对 ES6 特性也有了较好的支持，即使有些特性还没有支持，也可以借助 [Babel](http://babeljs.io/) 编译来支持。

#### 特性

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
* 支持初始化，前置，后置，空操作
* 支持控制器私有方法
* 支持 Restful 设计
* 支持 Common 自动加载
* 支持启动自定义
* ...

#### 安装

环境要求：node >= 7.6.0, git（koahubjs的所有包都托管在github上，npm上只是引用，因此需要git或者ssh支持）
```javascript
//github
npm install koahubjs/koahub --save
//oschina
npm install git+https://git.oschina.net/koahubjs/koahub.git --save
```

#### 使用 ES6/7 特性来开发项目

```javascript
//base controller, app/controller/home/base.controller.js
module.exports = class extends koahub.controller {

    async _initialize() {
        console.log('base _initialize');
    }

    async isLogin() {
        console.log('base isLogin');
    }
}

//index controller, app/controller/home/index.controller.js
const base = require("./base.controller");
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

​	项目中可以使用 ES6/7 里的所有特性，借助 Babel 编译，可以稳定运行在 >= 7.6.0 的 Node.js 环境中。

#### 代码自动更新

​	koahub-cli 内置了一套代码自动更新的机制，文件修改后自动Babel编译立即生效，不用重启 Node.js 服务。

#### 详细的日志

##### 服务 启动日志

```
[2017-05-14 11:48:05] [Koahub] Koahub Version: 2.2.6
[2017-05-14 11:48:05] [Koahub] Koahub Website: http://js.koahub.com
[2017-05-14 11:48:05] [Koahub] Nodejs Version: v8.0.0
[2017-05-14 11:48:05] [Koahub] Nodejs Platform: darwin x64
[2017-05-14 11:48:05] [Koahub] Server Enviroment: development
[2017-05-14 11:48:05] [Koahub] Server running at: http://127.0.0.1:3000
```

##### HTTP 请求日志

```
<-- GET /home/index/index
--> GET /home/index/index 200 4ms 
```

##### Babel 编译日志

```
[2016-11-28 09:56:03] [Koahub] [Babel] app/controller/home/index.controller.js
```

#### 与其他框架的对比

##### 与 express/koa 对比

express/koa 是 2 个比较简单的框架，框架本身提供的功能比较简单，项目中需要借助大量的第三方插件才能完成项目的开发，所以灵活度比较高。但使用很多第三方组件一方面提高了项目的复杂度。

koa 1.x 使用 ES6 里的 `*/yield` 解决了异步回调的问题，但 `*/yield` 只会是个过渡解决方案，会被 ES7 里的 `async/await` 所替代。

##### 与 sails 对比

sails 也是一个提供整套解决方案的 Node.js 框架，对数据库、REST API、安全方面也很多封装，使用起来比较方便。

但 sails 对异步回调的问题还没有优化，还是使用 callback 的方式，给开发带来很大的不便，导致项目中无法较好的使用 ES6/7 特性。

##### 与 thinkjs 对比

thinkjs 是一个非常优秀的框架，在开发效率和体验上占有绝对优势，但是中间件非常少，框架还比较新，缺少社区等方面的支持，还没有经过超大型项目的检验。


#### 性能测试

![](https://raw.githubusercontent.com/koahubjs/koahub/master/docs/wrk.png)


### 创建项目

#### async/await
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

#### promise
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

#### generator
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

#### 启动项目

在项目目录下执行命令 `npm start`，如果能看到类似下面的内容，表示服务启动成功。

```
[2017-05-14 11:48:05] [Koahub] Koahub Version: 2.2.6
[2017-05-14 11:48:05] [Koahub] Koahub Website: http://js.koahub.com
[2017-05-14 11:48:05] [Koahub] Nodejs Version: v8.0.0
[2017-05-14 11:48:05] [Koahub] Nodejs Platform: darwin x64
[2017-05-14 11:48:05] [Koahub] Server Enviroment: development
[2017-05-14 11:48:05] [Koahub] Server running at: http://127.0.0.1:3000
```



### 项目结构

​	通过koahub命令安装的demo，默认使用的是mysql数据库，handlebars模板引擎。

```

   |-- app
   |   |-- addon
   |   |   |-- demo
   |   |   |   |-- config.json
   |   |   |   |-- controller
   |   |   |   |-- model
   |   |   |   `-- view
   |   |-- config
   |   |   |-- default.config.js
   |   |-- controller
   |   |   |-- home
   |   |   |   |-- index.controller.js
   |   |   |   `-- base.controller.js
   |   |   |-- admin
   |   |-- data
   |   |-- model
   |   |-- util
   |   |-- index.js
   |-- logs
   |-- node_modules
   |-- runtime
   |-- www
   |-- app.js
   |-- package.json
   
```

#### app

源代码目录，启动时koahub-cli会自动将`app`目录下的文件编译到runtime目录下。

#### app/addon

插件扩展目录

#### app/config

配置目录，配置默认后缀 `config.js`

#### app/controller

控制器目录，控制器默认后缀 `controller.js`

#### app/model

模型目录，模型默认后缀 `model.js`

#### app/util

函数工具目录，模型默认后缀 `util.js`

#### runtime

`babel`编译过的代码目录，实际项目运行的是这个目录下的代码，正式部署到环境上面，也是这个目录下的代码，等待nodejs环境支持`export/import，async/await`，这个目录会存缓存文件

#### www

静态文件目录，存放图片，样式等文件的目录

#### app.js

项目启动入口文件，通过导入`koahub-cli`启动项目，也可以直接 `koahub start app/index.js —watch —compile`



### 代码规范

#### 大小写规范

koahub无伦是文件名还是控制器都默认区分大小写，很多在 `Windows` 下开发项目不区分大小写，所以如果服务器环境是 `Linux` 要特别注意。

#### 使用ES6语法

ES6 中有大量的语法糖可以简化我们的代码，让代码更加简洁高效。 Node.js 最新版本已经较好的支持了 ES6 的语法，即使有些语法不支持，也可以通过 Babel 编译来支持。

#### constructor 方法

控制器 `constructor` 方法请尽量不要使用，推荐使用 `_initialize` ，如果需要使用，必须调用 `super`

```javascript
module.exports = class koahub.controller {
    constructor(ctx, next) {
        super(ctx, next);
    }
}
```

#### 使用 Babel 编译

虽然现在的 Node.js 版本已经支持了很多 ES6 的特性，但这些特性现在还只是实现了，V8 里还没有对这些特性进行优化。如：`*/yield` 等功能。

所以建议使用 Babel 来编译，一方面可以使用 ES6 和 ES7 几乎所有的特性，另一方面编译后的性能也比默认支持的要高。

#### 使用 async/await

`async/await` 是nodejs异步最终解决方案



### 断点调试

无论是在 VS Code（v1.7+） 下断点调试，还是在WebStorm 下断点调试，断点一定要设置在 runtime 目录下，不能设置在 app目录下。





### 常见问题

#### 为什么推荐 ES6/7 语法开发项目

ES6/7 里提供了大量的新特性，这些特性会带来巨大的开发便利和效率上的提升。如：ES6 里的 `*/yield` 和 ES7 里的 `async/await` 特性解决异步回调的问题；箭头函数解决 `this` 作用域的问题；`class` 语法糖解决类继承的问题。

虽然现在 Node.js 环境还没有完全支持这些新的特性，但借助 Babel 编译，可以稳定运行在现在的 Node.js 环境中。所以我们尽可以享受这些新特性带来的便利。

#### 开发时，修改文件需要重启服务么？

默认情况下，由于 Node.js 的机制，文件修改必须重启才能生效。

这种方式下给开发带来了很大的不变，koahub-cli 提供了一种文件自动更新的机制，文件修改后可以自动Babel编译文件立即生效，无需重启服务。

自动更新的机制会消耗一定的性能，所以默认只在 `development` 项目环境下开启。线上代码更新还是建议使用 `pm2` 模块来管理。

#### 如何修改服务监听的端口

默认情况下，Node.js 服务监听的端口为 `3000`，如果需要修改的话，可以通过修改配置文件 `app/config/default.config.js` 来修改，如：

```javascript
module.exports = {
    port: 1234 //将监听的端口修改为 1234
}
```

#### 如何使用控制器私有方法

目前ES还不支持私有化方法，但是koahub默认规则是方法名以`_`开头的是私有方法。

```javascript
module.exports = class extends koahub.controller {
    _index(){
        // 私有方法
    }
}
```

#### 并行处理

使用 `async/await` 来处理异步时，是串行执行的。但很多场景下我们需要并行处理，这样可以大大提高执行效率，此时可以结合 `Promise.all` 来处理。

```javascript
module.exports = class extends koahub.controller {
    async index() {
        let d1 = this.getData1();
        let d2 = this.getData2();
        let [d1Data, d2Data] = await Promise.all([d1, d2]);
    }
}
```

#### 如何输出图片

项目中有时候要输出图片等类型的数据，可以通过下面的方式进行：

```javascript
module.exports = class extends koahub.controller {
    async index() {
        //图片 buffer 数据，读取本地文件或者从远程获取
        let imageBuffer = new Buffer();
        this.set('Content-Type', 'image/png');
        this.view(imageBuffer);
    }
}
```

#### 如何跨模块调用

可以通过 `this.action` 方法调用其他模块里 controller 下的 action 方法，如：

```javascript
// app/controller/home/index.controller.js
module.exports = class extends koahub.controller {
    async index1() {
        let data = await this.action("/home/index/index2");
        this.view(data);
    }
    async index2() {
        return 'Hello World';
    }
}
```

#### 用户登录后才能访问

```javascript
// app/controller/home/base.controller.js
module.exports = class extends koahub.controller {
    async _initialize() {
        await this.isLogin();
    }

    async isLogin() {
        // 判断登录业务逻辑
    }
}
```

```javascript
// app/controller/home/index.controller.js
const base = require("./base.controller");
module.exports = class extends base {
    async _initialize() {
        await super._initialize();
    }
  	
  	async index() {
      	await this.render('index');
  	}
}
```



## 应用

### 模块

koahub 创建项目时支持多种项目模式，默认创建的项目是按模块来划分的。使用模块的方式划分项目，可以让项目结构更加清晰。如：一般一个博客系统可分为前后台 2 个模块。

#### 模块列表

`app/controller` 下面的目录就是模块列表

#### 默认模块

默认模块为 `home` 模块。当解析用户的请求找不到模块时会自动对应到 `home` 下。

可以通过配置 `default_module` 来修改默认模块，修改配置文件 `app/config/default.config.js`：

```javascript
//将默认模块名改为 admin
module.exports = {
    default_module: "admin"
}
```



### 控制器

控制器是一类操作的集合，用来响应用户同一类的请求。

#### 定义控制器

创建文件 `app/controller/home/index.controller.js`，表示 `home` 模块下有名为 `index` 控制器，文件内容类似如下：

```javascript
module.exports = class extends koahub.controller {
  	async index (){
      	this.view('Hello World!');
    }
}
```

#### 常用控制器方法

ctx上的函数或参数将自动加载到Controller，例如支持 `this.body = 'Hello World!'`, ctx中具体的API请参考Koa.js, Controller中的扩展方法如下。

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
this.validate(rule, data);
await this.action(path, ...args);
```



### 配置

#### 默认配置


```javascript
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
```
#### 修改配置

创建 `app/config/default.config.js` 配置文件，例如修改默认启动端口和模块

```javascript
// app/config/default.config.js
module.exports = {
    port: 1234,
    default_module: 'admin'
}
```

#### 加载配置

loader配置的默认加载全局变量koahub，例如新增加载util文件夹，将util文件夹下的所有后缀是 `util.js` 加载到全局变量 `koahub.utils` ，addon配置是插件扩展文件夹。

```javascript
// app/config/default.config.js
module.exports = {
    loader: {
	    "utils": {
	        root: 'util',
	        suffix: '.util.js'
	    }
	}
}
```



### 视图

koahub默认未内置任何模板引擎，koahub-demo使用了handlebars模板引擎。可以通过中间件的方式，自定义支持ejs，jade等等各种模板引擎，或者使用前后段完全分离的方案开发项目。



### 路由

#### 自动加载路由

koahub默认使用了自动加载路由，类似于thinkphp的开发方式。例如访问的路径是 `/home/user/index`，home会解析成模块，user会解析成控制器，index会解析成方法，此时会加载 `app/controller/home/user.controller.js` 下的index方法。

#### 多级控制器

koahub支持多级控制器，例如访问的路径是 `/home/shop/product/index`，home会解析成模块，shop/product会解析成控制器，index解析成方法，此时会加载 `app/controller/home/shop/product.controller.js` 下的index方法。

#### 自定义REST路由

通过配置router.config.js文件，实现自定义路由功能。新增 `this.ctx.originalPath` 获取原始请求路径。

```javascript
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

GET 请求 `/product` 自动转发到 GET 请求 `/home/product/index`

如果不区分请求类型

```javascript
module.exports = [
    ['/product', "/home/product/index"]
}
```

`GET` 请求 `/product/1` 自动转发到 `GET` 请求 `/home/product/detail?id=1`

`POST` 请求 `/product/1` 自动转发到 `POST` 请求 `/home/product/add?id=1`

`PUT` 请求 `/product/1` 自动转发到 `PUT` 请求 `/home/product/update?id=1`

`DELETE` 请求 `/product/1` 自动转发到 `DELETE` 请求 `/home/product/delete?id=1`



### 钩子

钩子一般用于数据统计，功能扩展等，默认是开启状态。


```javascript
// 注册
this.hook.add('addOrder', async function sendEmail(orderId) {
    // 业务逻辑
});
this.hook.add('addOrder', async function addLog(orderId) {
    // 业务逻辑
});

// 运行 - 等待
await this.hook.run('addOrder', 1);

// 运行 - 不等待
this.hook.run('addOrder', 1);
```



### 插件

插件默认目录 `addon` ，可以通过更加方便的URL地址访问到模块中的插件定义的控制器。

请求 `/addon/demo/index/index`，会调用 `app/addon/demo/controller/index.controller.js` 下的index方法。 



### 前后置

koahub登录授权验证如果是异步的，可以放到前后置操作里面。如果前后置操作输出数据到页面的话，响应将会中断不会再继续执行下面的流程。

```javascript
// app/controller/home/index.controller.js
module.exports = class extends koahub.controller {
    async _initialize() {
      	// 控制器初始化
    }

    async _before() {
        // 控制器前置
    }

    async _before_index() {
        // 方法前置
    }

    async index() {
        this.view('Hello World!');
    }

    async _after_index() {
        // 方法后置
    }

    async _after() {
        // 控制器后置
    }
}
```



### 加载

文件夹加载可以通过配置实现，例如加载 `koahub.utils` 

```javascript
// app/config/default.config.js
module.exports = {
    loader: {
	    "utils": {
	        root: 'util',
	        suffix: '.util.js'
	    }
	}
}
```

参数

`root` 文件夹加载路径，默认是 `app` 文件夹下

`suffix` 加载相应后缀的文件

`prefix` 加载之后设置的前缀

`filter` 使用正则表达式，过滤加载的路径



### 模型

koahub默认未内置任何数据库，koahub-demo使用了bookshelf。可以通过中间件的方式，自定义支持mysql，mongodb等等各种数据库。





## 中间件

### 快捷中间件

快捷中间件用户适配各种中间件问题，更换不同的中间件，后期扩展非常方便。例如使用 `koa-better-body` 中间件处理post数据，才能支持 `this.post`，`this.file` 接收数据。

```javascript
const Koahub = require("koahub");
const convert = require("koa-convert");
const body = require("koa-better-body");

const app = new Koahub();
const koa = app.getKoa();

koa.use(convert(body()));

// 快捷中间件
koa.use(async function(ctx, next) {

    if (ctx.request.fields) {
        ctx.post = ctx.request.fields;
    }
    if (ctx.request.files) {
        ctx.file = ctx.request.files;
    }

    await next();
});

app.run();
```

`koa-better-body` 替换成 `koa-body`，这样只需要更改中间件和快捷中间件就行了，不需要修改业务逻辑。

```javascript
const Koahub = require("koahub");
const convert = require("koa-convert");
const body = require("koa-body");

const app = new Koahub();
const koa = app.getKoa();

koa.use(convert(body()));

// 快捷中间件
koa.use(async function(ctx, next) {

    if (!ctx.request.body.files) {
        ctx.post = ctx.request.body;
    } else {
        ctx.post = ctx.request.body.fields;
        ctx.file = ctx.request.body.files;
    }

    await next();
});

app.run();
```



### 常用中间件

[中间件列表](https://github.com/koajs/koa/wiki)



## 扩展功能

### koahub命令行

`koahub -h, —help` 输出帮助信息

`koahub -V, —version` 输出版本信息

`koahub controller app/controller/home/index` 创建app/controller/home/index.controller.js控制器

`koahub start app/index.js —watch —compile`  启动koahub项目，开启babel编译和监控



### Babel

koahub-cli默认编译参数

```
{
    presets: ["es2015", "stage-3"],
    plugins: ["transform-runtime"]
}
```



### 线上部署

正式环境推荐将 `runtime` 部署到服务器，使用 `pm2` 启动项目，配置参考

```javascript
{
    "name": "koahub-demo",
    "script": "app.js",
    "watch": false,
    "ignore_watch": [
        "www/public",
        "logs",
        "node_modules"
    ],
    "exec_mode": "cluster",
    "max_memory_restart": "1G",
    "error_file": "./logs/error.log",
    "out_file": "./logs/out.log",
    "node_args": [],
    "args": [],
    "env": {}
}
```



## API


### app

koahub实例

```javascript
const Koahub = require("koahub");

const app = new Koahub();
```

### app.getKoa

koa实例

```javascript
const Koahub = require("koahub");

const app = new Koahub();
const koa = app.getKoa();
```

### app.getServer

获取server

```javascript
const Koahub = require("koahub");

const app = new Koahub();
const server = app.getServer();
```

获取socket

```javascript
const Koahub = require("koahub");
const socket = require("socket.io");

const app = new Koahub();
const server = app.getServer();
const io = socket(server);
```

### koahub

```javascript
{ author: { name: 'js.koahub.com' },
  dependencies:
   { 'babel-runtime': '^6.18.0',
     bluebird: '^3.4.7',
     koa: '^2.1.0-alpha.7',
     'koa-favicon': '^2.1.0',
     'koa-logger': '^2.1.0',
     lodash: '^4.17.1',
     'path-to-regexp': '^1.7.0' },
  devDependencies:
   { mocha: '^3.1.2',
     should: '^11.1.1',
     supertest: '^2.0.1' },
  directories: {},
  engines: { node: '>= 4' },
  keywords:
   [ 'web',
     'app',
     'http',
     'application',
     'framework',
     'koa',
     'koahub',
     'koahubjs' ],
  license: 'ISC',
  main: './lib/index.js',
  maintainers: [ { name: 'einsqing', email: '786699892@qq.com' } ],
  name: 'koahub',
  optionalDependencies: {},
  scripts:
   { compile: 'babel src/ --out-dir lib/ --watch --source-maps',
     test: 'mocha test/{,**/}*.test.js --recursive --require babel-polyfill --compilers js:babel-register' },
  version: '2.2.6',
  app: { subdomainOffset: 2, proxy: false, env: 'development' },
  paths:
   { rootPath: '/Users/heqing/Downloads/koahub-demo-master',
     runtimeFile: '/Users/heqing/Downloads/koahub-demo-master/runtime/index.js',
     runtimePath: '/Users/heqing/Downloads/koahub-demo-master/runtime',
     runtimeName: 'runtime' },
  configs:
   [ db: { type: 'mysql',
       host: '127.0.0.1',
       user: 'root',
       password: '',
       database: 'koahub',
       charset: 'utf8' },
     default: { port: 3000,
       default_module: 'home',
       default_controller: 'index',
       default_action: 'index',
       favicon: 'www/favicon.ico',
       logger: true,
       loader: [Object] } ],
  config: [Function],
  controller: [Function: _class],
  controllers:
   [ '/home/base': [Function: _class],
     '/admin/index': [Function: _class],
     '/home/index': [Function: _class] ],
  modules: [ 'admin', 'home' ] }
```



### koahub.controller

控制器父类，继承之后，可以使用很多控制器方法

```javascript
[Function: _class]
```



### koahub.modules

项目模块列表

```javascript
[ 'admin', 'home' ]
```



### koahub.controllers

控制器列表

```javascript
[ '/admin/base': [Function: _class],
  '/admin/hook': [Function: _class],
  '/admin/index': [Function: _class],
  '/home/index': [Function: _class] ]
```


如发现文档中的错误，请[点击这里](mailto:786699892@qq.com)联系作者。

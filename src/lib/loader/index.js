var path = require('path');
var fs = require('fs');

/**
 uage koahub-loader

 1.model loader
 var model = loader([
 {
     root: './app/model',
     suffix: '.model.js'
 },
 {
     root: './addon',
     suffix: '.model.js',
     filter: [/\w*\/model\//]
 }
 ]);

 2.controller loader
 var app = require('koa')();
 var router = require('koa-router')();
 var controller = loader([
 {
    root: './app/controller',
    suffix: '.controller.js',
    prefix: '/',
 }, {
    root: './addon',
    suffix: '.controller.js',
    prefix: '/addon/',
    filter: [/\w*\/controller\//]
 }
 ]);

 for (var key in controller) {
    router.use(key, controller[key].routes());
 }
 app.use(router.routes());

 3.util loader
 var util = loader([
 {
     root: './app/common',
     suffix: '.util.js'
 },
 {
     root: './addon',
     suffix: '.util.js',
     filter: [/\w*\/common\//]
 }
 ]);
 **/


function walk(dir) {

    dir = path.resolve(process.cwd(), dir);

    var exist = fs.existsSync(dir);
    if (!exist) {
        return;
    }

    var files = fs.readdirSync(dir);
    var list = [];
    for (var file of files) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            list = list.concat(walk(dir + '/' + file));
        } else {
            list.push(dir + '/' + file);
        }
    }

    return list;
}

function loader(options) {

    if (typeof options == 'undefined') {
        options = {};
    }

    var loaders = [];
    if (typeof options.root !== 'string') {
        throw Error('root must be specified');
    }

    options.suffix = options.suffix || '.js';
    options.prefix = options.prefix || '';
    options.filter = options.filter || [];

    var paths = walk(options.root);
    if (!paths) {
        return;
    }

    paths.forEach(function (value, index) {
        var _path = path.relative(options.root, value);
        if (_path.lastIndexOf(options.suffix) != -1) {
            _path = _path.slice(0, _path.lastIndexOf(options.suffix));

            options.filter.forEach(function (v, i) {
                _path = _path.replace(v, '');
            });

            _path = options.prefix + _path;

            loaders[_path] = require(value).default;
        }
    });

    return loaders;
}

function concat(arr1, arr2) {

    var arr = arr1;

    for (var key in arr2) {
        arr[key] = arr2[key];
    }

    return arr;
}

module.exports = function (options) {

    var loaders = [];

    if (options instanceof Array) {
        for (var option of options) {
            loaders = concat(loaders, loader(option));
        }
    } else {
        loaders = loader(options);
    }

    return loaders;
};
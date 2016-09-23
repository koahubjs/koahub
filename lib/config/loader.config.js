'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "controller": [{
        root: appName + '/controller',
        suffix: '.controller.js',
        prefix: '/'
    }, {
        root: appName + '/addon',
        suffix: '.controller.js',
        prefix: '/addon/',
        filter: [/\w*\/controller\//]
    }],
    "util": [{
        root: appName + '/util',
        suffix: '.util.js'
    }, {
        root: appName + '/addon',
        suffix: '.util.js',
        filter: [/\w*\/util\//]
    }],
    "model": [{
        root: appName + '/model',
        suffix: '.model.js'
    }, {
        root: appName + '/addon',
        suffix: '.model.js',
        filter: [/\w*\/model\//]
    }],
    "config": [{
        root: appName + '/config',
        suffix: '.config.js'
    }, {
        root: appName + '/addon',
        suffix: '.config.js',
        filter: [/\w*\/config\//]
    }]
};
//# sourceMappingURL=loader.config.js.map
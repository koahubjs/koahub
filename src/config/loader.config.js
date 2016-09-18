/**
 *
 * 自动加载配置
 * autoload conf
 */
export default {
    "controller": [
        {
            root: './dist/controller',
            suffix: '.controller.js',
            prefix: '/',
        }, {
            root: './dist/addon',
            suffix: '.controller.js',
            prefix: '/addon/',
            filter: [/\w*\/controller\//]
        }
    ],
    "util": [
        {
            root: './dist/util',
            suffix: '.util.js'
        }, {
            root: './dist/addon',
            suffix: '.util.js',
            filter: [/\w*\/util\//]
        }
    ],
    "model": [
        {
            root: './dist/model',
            suffix: '.model.js'
        }, {
            root: './dist/addon',
            suffix: '.model.js',
            filter: [/\w*\/model\//]
        }
    ],
    "config": [
        {
            root: './dist/config',
            suffix: '.config.js'
        }, {
            root: './dist/addon',
            suffix: '.config.js',
            filter: [/\w*\/config\//]
        }
    ]
}
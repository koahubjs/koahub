'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
    function _class() {
        (0, _classCallCheck3.default)(this, _class);
    }

    (0, _createClass3.default)(_class, null, [{
        key: 'loader',
        value: function loader(appName) {
            return {
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
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=config.class.js.map
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

    (0, _createClass3.default)(_class, [{
        key: 'method',
        value: function method() {
            return koahub.ctx.method;
        }
    }, {
        key: 'isGet',
        value: function isGet() {
            if (koahub.ctx.method == 'GET') {
                return true;
            }
            return false;
        }
    }, {
        key: 'isPost',
        value: function isPost() {
            if (koahub.ctx.method == 'POST') {
                return true;
            }
            return false;
        }
    }, {
        key: 'isAjax',
        value: function isAjax() {
            return this.header('X-Requested-With') === 'XMLHttpRequest';
        }
    }, {
        key: 'isPjax',
        value: function isPjax() {
            return this.header('X-PJAX') || false;
        }
    }, {
        key: 'isMethod',
        value: function isMethod(method) {
            return koahub.ctx.method === method.toUpperCase();
        }
    }, {
        key: 'ip',
        value: function ip() {
            return koahub.ctx.ip;
        }
    }, {
        key: 'header',
        value: function header(name, value) {
            if (value) {
                koahub.ctx.set(name, value);
            } else {
                return koahub.ctx.get(name);
            }
        }
    }, {
        key: 'status',
        value: function status(code) {
            if (code) {
                koahub.ctx.status = code;
            } else {
                return koahub.ctx.status;
            }
        }
    }, {
        key: 'get',
        value: function get(name) {
            if (name) {
                return koahub.ctx.query[name];
            } else {
                return koahub.ctx.query;
            }
        }
    }, {
        key: 'post',
        value: function post(name) {
            if (name) {
                return koahub.ctx.post[name];
            } else {
                return koahub.ctx.post;
            }
        }
    }, {
        key: 'file',
        value: function file(name) {
            if (name) {
                return koahub.ctx.file[name];
            } else {
                return koahub.ctx.file;
            }
        }
    }, {
        key: 'host',
        value: function host() {
            return koahub.ctx.host;
        }
    }, {
        key: 'redirect',
        value: function redirect(url) {
            koahub.ctx.redirect(url);
        }
    }, {
        key: 'view',
        value: function view(data) {
            koahub.ctx.body = data;
        }
    }, {
        key: 'json',
        value: function json(data) {
            var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            koahub.ctx.body = {
                data: data,
                msg: msg
            };
            koahub.ctx.body.code = koahub.ctx.status;
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=http.class.js.map
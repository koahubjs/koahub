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
        key: 'isGet',
        value: function isGet() {
            if (ctx.method == 'GET') {
                return true;
            }
            return false;
        }
    }, {
        key: 'isPost',
        value: function isPost() {
            if (ctx.method == 'POST') {
                return true;
            }
            return false;
        }
    }, {
        key: 'view',
        value: function view() {}
    }, {
        key: 'json',
        value: function json(data) {
            ctx.body = data;
        }
    }]);
    return _class;
}();

exports.default = _class;
//# sourceMappingURL=http.class.js.map
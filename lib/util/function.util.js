'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.strToJsTemplate = strToJsTemplate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// es6 str js template
function strToJsTemplate(template, data) {

    var keys = (0, _keys2.default)(data),
        dataList;

    dataList = keys.map(function (key) {
        return data[key];
    });

    // 这里使用反引号来构建模板引擎
    return new Function(keys.join(','), 'return `' + template + '`;').apply(null, dataList);
}
//# sourceMappingURL=function.util.js.map
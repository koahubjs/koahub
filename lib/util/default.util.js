'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

exports.runAction = runAction;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// run module/controller/action
function runAction(path) {

    var paths = path.split('/');
    var action = paths[paths.length - 1];
    var module = paths[1];
    var _path = path.slice(0, path.lastIndexOf('/'));

    var include = false;
    for (var key in koahub.controllers) {
        if (key == _path) {
            include = true;
            break;
        }
    }

    if (include) {
        var controller = koahub.controllers[_path];
        var property = (0, _getOwnPropertyNames2.default)(controller.prototype).filter(function (value) {
            if (value == 'constructor') {
                return false;
            }
            return true;
        });

        for (var k in property) {
            if (property[k] == action) {
                (0, _getPrototypeOf2.default)(new controller())[property[k]].call(this);
                return;
            }
        }

        if (_path + '/index' == path) {
            ctx.throw(404, 'Not Found Action');
            return;
        }
        ctx.redirect(_path + '/index');
    } else {

        if (!module || module == koahub.configs.default.default_module) {
            ctx.redirect('/' + koahub.configs.default.default_module + '/' + koahub.configs.default.default_controller + '/' + koahub.configs.default.default_action);
        } else {
            ctx.redirect('/' + module + '/' + koahub.configs.default.default_controller + '/' + koahub.configs.default.default_action);
        }
    }
}
//# sourceMappingURL=default.util.js.map
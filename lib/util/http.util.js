'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

exports.runAction = runAction;
exports.getAllModules = getAllModules;
exports.getModuleControllerAction = getModuleControllerAction;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// run module/controller/action
function runAction(path) {
    var _throw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _getModuleControllerA = getModuleControllerAction(path),
        module = _getModuleControllerA.module,
        controller = _getModuleControllerA.controller,
        action = _getModuleControllerA.action;

    var ctrl = koahub.controllers['/' + module + '/' + controller];
    if (ctrl) {
        var property = (0, _getOwnPropertyNames2.default)(ctrl.prototype).filter(function (value) {
            if (value == 'constructor') {
                return false;
            }
            return true;
        });

        for (var k in property) {
            if (property[k] == action) {
                (0, _getPrototypeOf2.default)(new ctrl())[property[k]].call(this);
                return;
            }
        }

        if (_throw) {
            ctx.throw(404, 'Not Found Action');
        } else {
            console.error('Not Found Action');
        }
    } else {

        if (_throw) {
            ctx.throw(404, 'Not Found Controller');
        } else {
            console.error('Not Found Controller');
        }
    }
}

// get all modules
function getAllModules() {

    var modules = [];
    for (var key in koahub.controllers) {
        modules.push(key.split('/')[1]);
    }
    modules = koahub.utils.lodash.union(modules);
    return modules;
}

// get module controller action
function getModuleControllerAction(path) {

    var paths = [];
    if (path != '/') {
        paths = path.substr(1, path.length).split('/');
        for (var key in paths) {
            if (!paths[key]) {
                ctx.throw(403, 'The url is error');
                return;
            }
        }
    }

    var module = koahub.configs.index.default_module;
    var controller = koahub.configs.index.default_controller;
    var action = koahub.configs.index.default_action;

    switch (paths.length) {
        case 0:

            break;
        case 1:

            module = paths[0];
            break;
        case 2:

            module = paths[0];
            controller = paths[1];
            break;
        case 3:

            module = paths[0];
            controller = paths[1];
            action = paths[2];
            break;
        default:

            module = paths[0];
            controller = '';
            for (var key in paths) {
                if (key > 0 && key < paths.length - 1) {
                    if (key == paths.length - 2) {
                        controller += paths[key];
                        break;
                    }
                    controller += paths[key] + '/';
                }
            }
            action = paths[paths.length - 1];
    }

    return {
        module: module,
        controller: controller,
        action: action
    };
}
//# sourceMappingURL=http.util.js.map
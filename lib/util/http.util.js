'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

    var modules = getAllModules();
    if (!koahub.utils.lodash.includes(modules, module)) {
        if (_throw) {
            ctx.throw(404, 'Not Found Module');
        } else {
            console.error('Not Found Module');
        }
        return;
    }

    var ctrl = koahub.controllers['/' + module + '/' + controller];
    if (ctrl) {

        var _ctrl = new ctrl();
        var methods = (0, _getOwnPropertyNames2.default)(ctrl.prototype).filter(function (value) {
            return value !== 'constructor';
        });

        if (koahub.utils.lodash.includes(methods, action)) {

            try {
                _ctrl[action](this);
            } catch (err) {
                throw err;
            }
        } else {
            if (_throw) {
                ctx.throw(404, 'Not Found Action');
            } else {
                console.error('Not Found Action');
            }
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
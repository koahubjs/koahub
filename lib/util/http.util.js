"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runAction = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getOwnPropertyNames = require("babel-runtime/core-js/object/get-own-property-names");

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// run module/controller/action
var runAction = exports.runAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path) {
        var _getModuleControllerA, module, controller, action, modules, ctrl, _ctrl, methods;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _getModuleControllerA = getModuleControllerAction(path), module = _getModuleControllerA.module, controller = _getModuleControllerA.controller, action = _getModuleControllerA.action;
                        modules = getAllModules();

                        if (_lodash2.default.includes(modules, module)) {
                            _context.next = 5;
                            break;
                        }

                        (0, _debug.http)('Not Found Module');
                        return _context.abrupt("return");

                    case 5:
                        ctrl = koahub.controllers["/" + module + "/" + controller];

                        if (!ctrl) {
                            _context.next = 23;
                            break;
                        }

                        _ctrl = new ctrl();
                        methods = (0, _getOwnPropertyNames2.default)(ctrl.prototype).filter(function (value) {
                            return value !== 'constructor';
                        });

                        if (!_lodash2.default.includes(methods, action)) {
                            _context.next = 20;
                            break;
                        }

                        _context.prev = 10;
                        _context.next = 13;
                        return _ctrl[action](this);

                    case 13:
                        _context.next = 18;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context["catch"](10);
                        throw _context.t0;

                    case 18:
                        _context.next = 21;
                        break;

                    case 20:

                        (0, _debug.http)('Not Found Action');

                    case 21:
                        _context.next = 24;
                        break;

                    case 23:

                        (0, _debug.http)('Not Found Controller');

                    case 24:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[10, 15]]);
    }));

    return function runAction(_x) {
        return _ref.apply(this, arguments);
    };
}();

// get all modules


exports.getAllModules = getAllModules;
exports.getModuleControllerAction = getModuleControllerAction;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _debug = require("./debug.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllModules() {

    var modules = [];
    for (var key in koahub.controllers) {
        modules.push(key.split('/')[1]);
    }
    modules = _lodash2.default.union(modules);
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
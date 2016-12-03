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
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
        var _getModuleControllerA, module, controller, action, modules, ctrl, _ctrl, methods;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _getModuleControllerA = getModuleControllerAction(ctx.path), module = _getModuleControllerA.module, controller = _getModuleControllerA.controller, action = _getModuleControllerA.action;
                        modules = getAllModules();

                        if (_lodash2.default.includes(modules, module)) {
                            _context.next = 5;
                            break;
                        }

                        (0, _log.http)('Not Found Module');
                        return _context.abrupt("return");

                    case 5:
                        ctrl = koahub.controllers["/" + module + "/" + controller];

                        if (!ctrl) {
                            _context.next = 25;
                            break;
                        }

                        _ctrl = new ctrl(ctx, next);
                        methods = (0, _getOwnPropertyNames2.default)(ctrl.prototype).filter(function (value) {
                            return value !== 'constructor';
                        });

                        // constructor响应3xx，中断执行

                        if (!/^[3][0-9]{2}/.test(ctx.status)) {
                            _context.next = 11;
                            break;
                        }

                        return _context.abrupt("return");

                    case 11:
                        if (!_lodash2.default.includes(methods, action)) {
                            _context.next = 22;
                            break;
                        }

                        _context.prev = 12;
                        _context.next = 15;
                        return _ctrl[action](this);

                    case 15:
                        _context.next = 20;
                        break;

                    case 17:
                        _context.prev = 17;
                        _context.t0 = _context["catch"](12);
                        throw _context.t0;

                    case 20:
                        _context.next = 23;
                        break;

                    case 22:

                        (0, _log.http)('Not Found Action');

                    case 23:
                        _context.next = 26;
                        break;

                    case 25:

                        (0, _log.http)('Not Found Controller');

                    case 26:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[12, 17]]);
    }));

    return function runAction(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

// get all modules


exports.getAllModules = getAllModules;
exports.getModuleControllerAction = getModuleControllerAction;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _log = require("./log.util");

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

    var module = koahub.config('default_module');
    var controller = koahub.config('default_controller');
    var action = koahub.config('default_action');

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
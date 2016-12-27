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
        var denyList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var _getModuleControllerA,
            module,
            controller,
            action,
            ctrl,
            _ctrl,
            methods,
            _len,
            args,
            _key,
            _args = arguments;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _getModuleControllerA = getModuleControllerAction(ctx.path), module = _getModuleControllerA.module, controller = _getModuleControllerA.controller, action = _getModuleControllerA.action;

                        if (_lodash2.default.includes(koahub.modules, module)) {
                            _context.next = 4;
                            break;
                        }

                        (0, _log.http)('Not Found Module');
                        return _context.abrupt("return");

                    case 4:
                        ctrl = koahub.controllers["/" + module + "/" + controller];

                        if (!ctrl) {
                            _context.next = 47;
                            break;
                        }

                        _ctrl = new ctrl(ctx, next);
                        methods = (0, _getOwnPropertyNames2.default)(ctrl.prototype).filter(function (value) {
                            return value !== 'constructor';
                        });

                        // constructor不响应404，中断执行

                        if (!(ctx.status != 404)) {
                            _context.next = 10;
                            break;
                        }

                        return _context.abrupt("return");

                    case 10:
                        if (!denyList) {
                            _context.next = 15;
                            break;
                        }

                        if (!_ctrl.denyList) {
                            _context.next = 15;
                            break;
                        }

                        if (!_lodash2.default.isArray(_ctrl.denyList)) {
                            _context.next = 15;
                            break;
                        }

                        if (!_lodash2.default.includes(_ctrl.denyList, action)) {
                            _context.next = 15;
                            break;
                        }

                        return _context.abrupt("return");

                    case 15:
                        for (_len = _args.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                            args[_key - 3] = _args[_key];
                        }

                        if (!_lodash2.default.includes(methods, action)) {
                            _context.next = 39;
                            break;
                        }

                        _context.prev = 17;

                        if (!_lodash2.default.includes(methods, '_before')) {
                            _context.next = 21;
                            break;
                        }

                        _context.next = 21;
                        return _ctrl['_before'].apply(_ctrl, args);

                    case 21:
                        if (!_lodash2.default.includes(methods, "_before_" + action)) {
                            _context.next = 24;
                            break;
                        }

                        _context.next = 24;
                        return _ctrl["_before_" + action].apply(_ctrl, args);

                    case 24:
                        _context.next = 26;
                        return _ctrl[action].apply(_ctrl, args);

                    case 26:
                        if (!_lodash2.default.includes(methods, "_after_" + action)) {
                            _context.next = 29;
                            break;
                        }

                        _context.next = 29;
                        return _ctrl["_after_" + action].apply(_ctrl, args);

                    case 29:
                        if (!_lodash2.default.includes(methods, '_after')) {
                            _context.next = 32;
                            break;
                        }

                        _context.next = 32;
                        return _ctrl['_after'].apply(_ctrl, args);

                    case 32:
                        _context.next = 37;
                        break;

                    case 34:
                        _context.prev = 34;
                        _context.t0 = _context["catch"](17);
                        throw _context.t0;

                    case 37:
                        _context.next = 45;
                        break;

                    case 39:
                        if (!_lodash2.default.includes(methods, '_empty')) {
                            _context.next = 44;
                            break;
                        }

                        _context.next = 42;
                        return _ctrl['_empty'].apply(_ctrl, args);

                    case 42:
                        _context.next = 45;
                        break;

                    case 44:
                        (0, _log.http)('Not Found Action');

                    case 45:
                        _context.next = 48;
                        break;

                    case 47:

                        (0, _log.http)('Not Found Controller');

                    case 48:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[17, 34]]);
    }));

    return function runAction(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

// url obj to param


exports.urlObjToParam = urlObjToParam;
exports.getModuleControllerAction = getModuleControllerAction;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _log = require("./log.util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function urlObjToParam(query, obj) {

    var param = '';
    for (var key in obj) {
        param += '&' + key + '=' + obj[key];
    }

    param = '?' + param.substr(1, param.length);
    if (query) {
        param += '&' + query;
    }
    return param;
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
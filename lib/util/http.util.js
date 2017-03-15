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
        var _getModuleControllerA,
            module,
            controller,
            action,
            ctrl,
            filters,
            _ctrl,
            methods,
            _len,
            args,
            _key,
            result,
            parseResult,
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

                        (0, _log2.default)('Not Found Module');
                        return _context.abrupt("return");

                    case 4:
                        ctrl = koahub.controllers["/" + module + "/" + controller];
                        filters = ['constructor', '_initialize', '_before', "_before_" + action, "_after_" + action, '_after', '_empty'];

                        // 方法首字符是`_`表示私有方法

                        if (!(ctrl && action.substr(0, 1) != '_' && !_lodash2.default.includes(filters, action))) {
                            _context.next = 79;
                            break;
                        }

                        _ctrl = new ctrl(ctx, next);
                        methods = (0, _getOwnPropertyNames2.default)(ctrl.prototype);

                        // constructor不响应404，中断执行

                        if (!(ctx.status != 404)) {
                            _context.next = 11;
                            break;
                        }

                        return _context.abrupt("return");

                    case 11:
                        for (_len = _args.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                            args[_key - 2] = _args[_key];
                        }

                        if (!_lodash2.default.includes(methods, action)) {
                            _context.next = 71;
                            break;
                        }

                        _context.prev = 13;
                        result = void 0;

                        parseResult = function parseResult(data) {
                            if (data) {
                                result = data;
                            }
                        };

                        // 控制器初始化


                        if (!_lodash2.default.includes(methods, '_initialize')) {
                            _context.next = 22;
                            break;
                        }

                        _context.t0 = parseResult;
                        _context.next = 20;
                        return getPromiseFunction(_ctrl, '_initialize').apply(undefined, args);

                    case 20:
                        _context.t1 = _context.sent;
                        (0, _context.t0)(_context.t1);

                    case 22:
                        if (!(ctx.status != 404)) {
                            _context.next = 24;
                            break;
                        }

                        return _context.abrupt("return");

                    case 24:
                        if (!_lodash2.default.includes(methods, '_before')) {
                            _context.next = 30;
                            break;
                        }

                        _context.t2 = parseResult;
                        _context.next = 28;
                        return getPromiseFunction(_ctrl, '_before').apply(undefined, args);

                    case 28:
                        _context.t3 = _context.sent;
                        (0, _context.t2)(_context.t3);

                    case 30:
                        if (!(ctx.status != 404)) {
                            _context.next = 32;
                            break;
                        }

                        return _context.abrupt("return");

                    case 32:
                        if (!_lodash2.default.includes(methods, "_before_" + action)) {
                            _context.next = 38;
                            break;
                        }

                        _context.t4 = parseResult;
                        _context.next = 36;
                        return getPromiseFunction(_ctrl, "_before_" + action).apply(undefined, args);

                    case 36:
                        _context.t5 = _context.sent;
                        (0, _context.t4)(_context.t5);

                    case 38:
                        if (!(ctx.status != 404)) {
                            _context.next = 40;
                            break;
                        }

                        return _context.abrupt("return");

                    case 40:
                        _context.t6 = parseResult;
                        _context.next = 43;
                        return getPromiseFunction(_ctrl, action).apply(undefined, args);

                    case 43:
                        _context.t7 = _context.sent;
                        (0, _context.t6)(_context.t7);

                        if (!(ctx.status != 404)) {
                            _context.next = 47;
                            break;
                        }

                        return _context.abrupt("return");

                    case 47:
                        if (!_lodash2.default.includes(methods, "_after_" + action)) {
                            _context.next = 53;
                            break;
                        }

                        _context.t8 = parseResult;
                        _context.next = 51;
                        return getPromiseFunction(_ctrl, "_after_" + action).apply(undefined, args);

                    case 51:
                        _context.t9 = _context.sent;
                        (0, _context.t8)(_context.t9);

                    case 53:
                        if (!(ctx.status != 404)) {
                            _context.next = 55;
                            break;
                        }

                        return _context.abrupt("return");

                    case 55:
                        if (!_lodash2.default.includes(methods, '_after')) {
                            _context.next = 61;
                            break;
                        }

                        _context.t10 = parseResult;
                        _context.next = 59;
                        return getPromiseFunction(_ctrl, '_after').apply(undefined, args);

                    case 59:
                        _context.t11 = _context.sent;
                        (0, _context.t10)(_context.t11);

                    case 61:
                        if (!(ctx.status != 404)) {
                            _context.next = 63;
                            break;
                        }

                        return _context.abrupt("return");

                    case 63:
                        return _context.abrupt("return", result);

                    case 66:
                        _context.prev = 66;
                        _context.t12 = _context["catch"](13);
                        throw _context.t12;

                    case 69:
                        _context.next = 77;
                        break;

                    case 71:
                        if (!_lodash2.default.includes(methods, '_empty')) {
                            _context.next = 76;
                            break;
                        }

                        _context.next = 74;
                        return _ctrl['_empty'].apply(_ctrl, args);

                    case 74:
                        _context.next = 77;
                        break;

                    case 76:
                        (0, _log2.default)('Not Found Action');

                    case 77:
                        _context.next = 80;
                        break;

                    case 79:

                        (0, _log2.default)('Not Found Controller');

                    case 80:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[13, 66]]);
    }));

    return function runAction(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

// url obj to param


exports.urlObjToParam = urlObjToParam;
exports.getModuleControllerAction = getModuleControllerAction;

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _default = require("./default.util");

var _log = require("./log.util");

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// generator to promise
function getPromiseFunction(_ctrl, method) {
    if ((0, _default.isGeneratorFunction)(_ctrl[method])) {
        return _co2.default.wrap(_ctrl[method]).bind(_ctrl);
    }
    return _ctrl[method].bind(_ctrl);
}function urlObjToParam(query, obj) {

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
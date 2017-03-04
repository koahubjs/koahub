'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.isGeneratorFunction = isGeneratorFunction;
exports.expressMiddlewareToKoaMiddleware = expressMiddlewareToKoaMiddleware;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check whether a function is generator.
 *
 * @param  {Function} fn
 * @return {Boolean}
 */
function isGeneratorFunction(fn) {
    return typeof fn === 'function' && fn.constructor && fn.constructor.name === 'GeneratorFunction';
}

/**
 * Parase express middleware to koa middleware
 * @param fn
 * @returns {Function}
 */
function expressMiddlewareToKoaMiddleware(fn) {
    return function (ctx, next) {
        return new _promise2.default(function (resolve, reject) {
            if (fn.length < 3) {
                fn()(ctx.req, ctx.res, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(next());
                    }
                });
            } else {
                fn(ctx.req, ctx.res, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(next());
                    }
                });
            }
        });
    };
}
//# sourceMappingURL=default.util.js.map
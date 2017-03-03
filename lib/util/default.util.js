'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGeneratorFunction = isGeneratorFunction;
/**
 * Check whether a function is generator.
 *
 * @param  {Function} fn
 * @return {Boolean}
 */
function isGeneratorFunction(fn) {
  return typeof fn === 'function' && fn.constructor && fn.constructor.name === 'GeneratorFunction';
}
//# sourceMappingURL=default.util.js.map
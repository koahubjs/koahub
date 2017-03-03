/**
 * Check whether a function is generator.
 *
 * @param  {Function} fn
 * @return {Boolean}
 */
export function isGeneratorFunction(fn) {
    return typeof fn === 'function' &&
        fn.constructor &&
        fn.constructor.name === 'GeneratorFunction'
}
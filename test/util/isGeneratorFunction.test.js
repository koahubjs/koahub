const common = require('./../../app/common');
const assert = require('assert');

describe('is generator function', function () {
    describe('generator functions', function () {
        it('should return false with non-generator function', function () {
            assert(!common.isGeneratorFunction(null))
            assert(!common.isGeneratorFunction(25))
            assert(!common.isGeneratorFunction('test'))
            assert(!common.isGeneratorFunction(function () {
            }))

            const noConstructorFn = function () {
            }
            noConstructorFn.constructor = undefined

            assert(!common.isGeneratorFunction(noConstructorFn))
        })

        it('should return true with a generator function', function () {
            assert(common.isGeneratorFunction(function *() {
                yield 'something'
            }))
        })
    })
})
import {isGeneratorFunction} from "./../../src/util/default.util";
import assert from "assert";

describe('is generator function', function () {
    describe('generator functions', function () {
        it('should return false with non-generator function', function () {
            assert(!isGeneratorFunction(null))
            assert(!isGeneratorFunction(25))
            assert(!isGeneratorFunction('test'))
            assert(!isGeneratorFunction(function () {
            }))

            var noConstructorFn = function () {
            }
            noConstructorFn.constructor = undefined

            assert(!isGeneratorFunction(noConstructorFn))
        })

        it('should return true with a generator function', function () {
            assert(isGeneratorFunction(function *() {
                yield 'something'
            }))
        })
    })
})
import assert from "assert";
import log from "./../../src/util/log.util";

describe('log util', () => {

    it('log info', () => {
        assert.ifError(log({info : 'This is a info log'}, 'info'))
    });
});

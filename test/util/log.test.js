const assert = require('assert');
const log = require('./../../app/util/log.util');

describe('log util', () => {

    it('log info', () => {
        assert.ifError(log({info: 'This is a info log'}, 'info'))
    });
});

const assert = require('assert');
const common = require('./../../app/common');

describe('log util', () => {

    it('log info', () => {
        assert.ifError(common.log({info: 'This is a info log'}, 'info'))
    });
});

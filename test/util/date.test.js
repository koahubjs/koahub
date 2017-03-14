import assert from "assert";
import {dateFormat} from "./../../src/util/time.util";

describe('time util', () => {

    it('Convert the current time', () => {
        assert(dateFormat(new Date('2017-03-07 22:51:54'), 'yyyy-MM-dd hh:mm:ss') == '2017-03-07 22:51:54')
    });
});

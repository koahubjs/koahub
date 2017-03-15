const moment = require('moment');

module.exports = function log(log, type = 'log') {

    if (typeof log == 'string') {
        console[type](`[${moment().format('YYYY-MM-DD HH:mm:ss')}] [Koahub] ${log}`);
    } else {
        console[type](log);
    }
}
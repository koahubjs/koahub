import {dateFormat} from "./time.util";

export default function log(log, type = 'log') {

    if (typeof log == 'string') {
        console[type](`[${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}] [Koahub] ${log}`);
    } else {
        console[type](log);
    }
}

export function debug(err) {

    if (process.env.NODE_ENV !== 'production') {
        log(err);
    } else {
        log(err.message);
    }
}

export function http(err) {

    if (process.env.NODE_ENV !== 'production') {
        log(err);
    } else {
        log(err.message);
    }
}
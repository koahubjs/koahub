import colors from "colors/safe";
import {dateFormat} from "./time.util";

export default function log(log, type = 'log') {
    if (typeof log == 'string') {
        console[type](`[${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}] [Koahubjs] ${log}`);
    } else {
        console[type](log);
    }
}

export function watch(path, type) {

    switch (type) {
        case 'add':
            log(colors.red(`[File Add] ${path}`));
            break;
        case 'change':
            log(colors.red(`[File Changed] ${path}`));
            break;
        case 'unlink':
            log(colors.red(`[File Unlink] ${path}`));
            break;
    }
}

export function debug(err) {

    if (process.env.NODE_ENV !== 'production') {
        log(err, 'error');
    } else {
        log(err.message);
    }
}

export function http(err) {

    if (process.env.NODE_ENV !== 'production') {
        log(err, 'error');
    } else {
        log(err.message);
    }
}
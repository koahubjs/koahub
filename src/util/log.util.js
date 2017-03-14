import {dateFormat} from "./time.util";

export default function log(log, type = 'log') {

    if (typeof log == 'string') {
        console[type](`[${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}] [Koahub] ${log}`);
    } else {
        console[type](log);
    }
}
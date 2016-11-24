import colors from "colors/safe";

export function debug(err) {

    if (koahub.config('debug')) {
        console.error(err);
    } else {
        console.log(err.message);
    }
}

export function http(err) {

    if (koahub.config('debug')) {
        console.error(err);
    } else {
        console.log(err);
    }
}

export function watch(path, type) {

    switch (type) {
        case 'add':
            console.log(colors.green('[File Add Server Restart] %s'), path);
            break;
        case 'change':
            console.log(colors.green('[File Changed Server Restart] %s'), path);
            break;
        case 'unlink':
            console.log(colors.green('[File Unlink Server Restart] %s'), path);
            break;
    }
}

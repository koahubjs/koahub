import colors from "colors/safe";

export function debug(err) {

    if (koahub.config('debug')) {
        koahub.log(err, 'error');
    } else {
        koahub.log(err.message);
    }
}

export function http(err) {

    if (koahub.config('debug')) {
        koahub.log(err, 'error');
    } else {
        koahub.log(err.message);
    }
}

export function watch(path, type) {

    switch (type) {
        case 'add':
            koahub.log(colors.red(`[File Add] ${path}`));
            break;
        case 'change':
            koahub.log(colors.red(`[File Changed] ${path}`));
            break;
        case 'unlink':
            koahub.log(colors.red(`[File Unlink] ${path}`));
            break;
    }
}

import chokidar from "chokidar";
import fs from "fs";
import {watch as debug} from "./../util/log.util";
import config from "./../config/index.config";

export default function watcher(callback) {

    const watcher = chokidar.watch(config.app, {
        ignored: /[\/\\]\./,
        persistent: true
    });

    watcher.on('add', (file, stats) => {

        // 新增文件stats undefined
        if (stats == undefined) {
            debug(file, 'add');
            callback(file);
        }
    });

    watcher.on('change', (file, stats) => {

        debug(file, 'change');
        callback(file);
    });

    watcher.on('unlink', (file, stats) => {

        const runtimePath = file.replace(`${config.appName}/`, `${config.runtimeName}/`);

        fs.unlink(runtimePath, () => {
            debug(file, 'unlink');
            callback(file);
        });
    });
}
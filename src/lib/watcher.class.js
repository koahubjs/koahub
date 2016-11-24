import chokidar from "chokidar";
import path from "path";
import fs from "fs";
import Koahub from "./../";
import {watch as watchDebug} from "./../util/log.util";

export default class {

    constructor(paths = {}) {

        const that = this;
        const watcher = chokidar.watch(paths.appPath, {
            ignored: /[\/\\]\./,
            persistent: true
        });

        this.startTime = new Date();

        watcher.on('add', function (_path, stats) {

            if (new Date() - that.startTime > 2000) {
                watchDebug(path.relative(paths.rootPath, _path), 'add');
                that.restart();
            }
        });

        watcher.on('change', function (_path, stats) {
            watchDebug(path.relative(paths.rootPath, _path), 'change');

            delete require.cache[_path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`)];

            that.restart();
        });

        watcher.on('unlink', function (_path, stats) {

            delete require.cache[_path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`)];
            fs.unlink(_path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`), function () {
                watchDebug(path.relative(paths.rootPath, _path), 'unlink');

                that.restart();
            });
        });
    }

    restart() {

        setTimeout(function () {
            new Koahub();
        }, 200);
    }
}
import chokidar from "chokidar";
import path from "path";
import fs from "fs";
import Koahub from "./../";
import {watch as debug} from "./../util/log.util";

export default class {

    constructor(paths = {}) {

        const watcher = chokidar.watch(paths.appPath, {
            ignored: /[\/\\]\./,
            persistent: true
        });

        watcher.on('add', (_path, stats) => {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);

            // 新增文件stats undefined
            if (stats == undefined) {
                debug(relativePath, 'add');
                this.restart();
            }
        });

        watcher.on('change', (_path, stats) => {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);

            debug(relativePath, 'change');
            this.clear(runtimePath);
        });

        watcher.on('unlink', (_path, stats) => {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);

            fs.unlink(runtimePath, () => {
                debug(relativePath, 'unlink');
                this.clear(runtimePath);
            });
        });
    }

    clear(file) {

        if (typeof file !== 'string') {
            throw new TypeError('Expected a string');
        }

        // delete itself from module parent
        if (require.cache[file] && require.cache[file].parent) {
            var i = require.cache[file].parent.children.length;

            while (i--) {
                if (require.cache[file].parent.children[i].id === file) {
                    require.cache[file].parent.children.splice(i, 1);
                }
            }
        }

        // delete module from cache
        delete require.cache[file];

        this.restart();
    }

    restart() {

        // babel compile延时
        setTimeout(function () {
            new Koahub();
        }, 200);
    }
}
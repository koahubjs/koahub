import chokidar from "chokidar";
import path from "path";
import fs from "fs";
import cluster from "cluster";
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
            this.restart();
        });

        watcher.on('unlink', (_path, stats) => {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);

            fs.unlink(runtimePath, () => {

                debug(relativePath, 'unlink');
                this.restart();
            });
        });
    }

    restart() {

        for (let id in cluster.workers) {
            cluster.workers[id].kill();
        }
    }
}
import chokidar from "chokidar";
import path from "path";
import fs from "fs";
import cluster from "cluster";
import Koahub from "./../";
import {watch as debug} from "./../util/log.util";

export default class {

    constructor(paths = {}) {

        const watcher = chokidar.watch(paths.appPath, {
            ignored: /[\/\\]\./,
            persistent: true
        });

        this.startTime = new Date();

        watcher.on('add', (_path, stats) => {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);
            const now = new Date();

            if (now - this.startTime > 600) {
                debug(relativePath, 'add');

                this.restart();
                this.masterSend('add');
            } else {
                this.startTime = now;
            }
        });

        watcher.on('change', (_path, stats) => {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);

            debug(relativePath, 'change');

            delete require.cache[runtimePath];

            this.restart();
            this.masterSend('change', runtimePath);
        });

        watcher.on('unlink', (_path, stats) => {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);

            delete require.cache[runtimePath];

            fs.unlink(runtimePath, () => {
                debug(relativePath, 'unlink');

                this.restart();
                this.masterSend('unlink', runtimePath);
            });
        });
    }

    // master线程通知子线程
    masterSend(type, file) {
        if (koahub.config('cluster_on')) {
            for (let id in cluster.workers) {
                cluster.workers[id].send({name: 'file', type: type, file: file});
            }
        }
    }

    // worker线程收到消息通知
    static workerGet(msg) {
        if (msg.type == 'change') {
            delete require.cache[msg.file];
        }

        if (msg.type == 'add') {

        }

        if (msg.type == 'unlink') {
            delete require.cache[msg.file];
        }

        setTimeout(function () {
            new Koahub();
        }, 600);
    }

    restart() {

        setTimeout(function () {
            new Koahub();
        }, 600);
    }
}
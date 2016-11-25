import chokidar from "chokidar";
import path from "path";
import fs from "fs";
import cluster from "cluster";
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

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);
            const now = new Date();

            if (now - that.startTime > 600) {
                watchDebug(relativePath, 'add');

                that.restart();
                that.clusterSend('add');
            } else {
                that.startTime = now;
            }
        });

        watcher.on('change', function (_path, stats) {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);

            watchDebug(relativePath, 'change');

            delete require.cache[runtimePath];

            that.restart();
            that.clusterSend('change', runtimePath);
        });

        watcher.on('unlink', function (_path, stats) {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);

            delete require.cache[runtimePath];

            fs.unlink(runtimePath, function () {
                watchDebug(relativePath, 'unlink');

                that.restart();
                that.clusterSend('unlink', runtimePath);
            });
        });
    }

    // master线程通知子线程
    clusterSend(type, file) {
        if (koahub.config('cluster_on')) {
            for (let id in cluster.workers) {
                cluster.workers[id].send({name: 'file', type: type, file: file});
            }
        }
    }

    // worker线程收到消息通知
    static workGet(msg) {
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
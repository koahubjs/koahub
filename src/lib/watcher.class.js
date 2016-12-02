import chokidar from "chokidar";
import decache from "decache";
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
        }).unwatch(paths.runtimeFile);// 移除启动主文件监控

        // 移除启动文件依赖监控
        const children = require.cache[paths.runtimeFile].children;
        const regExp = new RegExp(`/${paths.runtimeName}/`);
        for (let key in children) {
            if (regExp.test(children[key].id)) {
                watcher.unwatch(children[key].id);
            }
        }

        watcher.on('add', (_path, stats) => {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);

            // 新增文件stats undefined
            if (stats == undefined) {
                debug(relativePath, 'add');

                this.restart();
                this.masterSend('add');
            }
        });

        watcher.on('change', (_path, stats) => {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);

            debug(relativePath, 'change');

            decache(runtimePath);

            this.restart();
            this.masterSend('change', runtimePath);
        });

        watcher.on('unlink', (_path, stats) => {

            const relativePath = path.relative(paths.rootPath, _path);
            const runtimePath = _path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`);

            decache(runtimePath);

            fs.unlink(runtimePath, () => {
                debug(relativePath, 'unlink');

                this.restart();
                this.masterSend('unlink', runtimePath);
            });
        });
    }

    // master线程通知子线程
    masterSend(type, file) {
        if (koahub.config('cluster')) {
            for (let id in cluster.workers) {
                cluster.workers[id].send({name: 'file', type: type, file: file});
            }
        }
    }

    // worker线程收到消息通知
    static workerGet(msg) {
        if (msg.type == 'change') {
            decache(msg.file);
        }

        if (msg.type == 'add') {

        }

        if (msg.type == 'unlink') {
            decache(msg.file);
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
import chokidar from "chokidar";
import lodash from "lodash";
import path from "path";
import fs from "fs";
import Koahub from "./../";
import {watch as debug} from "./../util/log.util";

export default class {

    // 监控 loader自动加载的文件
    constructor(paths) {

        let watcherPaths = [];
        for (let key in koahub.config('loader')) {
            // 移除configs文件监控
            if (key == 'configs') {
                continue;
            }
            const loader = koahub.config('loader')[key];
            if (lodash.isArray(loader)) {
                for (let _key in loader) {
                    const root = loader[_key].root;
                    watcherPaths.push(root.replace(`${paths.runtimeName}/`, `${paths.appName}/`));
                }
            } else {
                const root = loader.root;
                watcherPaths.push(root.replace(`${paths.runtimeName}/`, `${paths.appName}/`));
            }
        }
        watcherPaths = lodash.union(watcherPaths);

        const watcher = chokidar.watch(watcherPaths, {
            ignored: /[\/\\]\./,
            persistent: true
        });

        watcher.on('add', (_path, stats) => {

            const runtimePath = _path.replace(`${paths.appName}/`, `${paths.runtimeName}/`);

            // 新增文件stats undefined
            if (stats == undefined) {
                debug(_path, 'add');
                this.restart();
            }
        });

        watcher.on('change', (_path, stats) => {

            const runtimePath = _path.replace(`${paths.appName}/`, `${paths.runtimeName}/`);

            debug(_path, 'change');
            this.clear(runtimePath);
        });

        watcher.on('unlink', (_path, stats) => {

            const runtimePath = _path.replace(`${paths.appName}/`, `${paths.runtimeName}/`);

            fs.unlink(runtimePath, () => {
                debug(_path, 'unlink');
                this.clear(runtimePath);
            });
        });
    }

    clear(file) {

        if (!path.isAbsolute(file)) {
            file = path.resolve(koahub.paths.rootPath, file);
        }

        if (typeof file !== 'string') {
            throw new TypeError('Expected a string');
        }

        // delete itself from module parent
        if (require.cache[file] && require.cache[file].parent) {
            let mods = require.cache[file].parent.children;
            for (var key in mods) {
                if (mods[key].id === file) {
                    delete mods[key];
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
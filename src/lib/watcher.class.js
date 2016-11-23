import chokidar from "chokidar";
import path from "path";
import Koahub from "./../";
import {watch as watchDebug} from "./../util/log.util";

export default class {

    constructor(paths = {}) {

        const watcher = chokidar.watch(paths.appPath, {
            ignored: /[\/\\]\./,
            persistent: true
        });

        watcher.on('change', function (_path, stats) {

            watchDebug(path.relative(paths.rootPath, _path));

            watcher.close();

            delete require.cache[_path.replace(`/${paths.appName}/`, `/${paths.runtimeName}/`)];

            setTimeout(function () {
                new Koahub();
            }, 200);
        });
    }
}
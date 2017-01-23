import path from "path";
import fs from "fs";

export default class {

    constructor(runtimePath, options) {

        // 启动目录
        this.runtimePath = runtimePath;

        let loaders = [];

        if (options instanceof Array) {
            for (let option of options) {
                loaders = this.concat(loaders, this.loader(option));
            }
        } else {
            loaders = this.loader(options);
        }

        return loaders;
    }

    walk(dir) {

        dir = path.resolve(this.runtimePath, dir);

        const exist = fs.existsSync(dir);
        if (!exist) {
            return;
        }

        const files = fs.readdirSync(dir);
        let list = [];

        for (let file of files) {
            if (fs.statSync(path.resolve(dir, file)).isDirectory()) {
                list = list.concat(this.walk(path.resolve(dir, file)));
            } else {
                list.push(path.resolve(dir, file));
            }
        }

        return list;
    }

    loader(options) {

        if (typeof options == 'undefined') {
            options = {};
        }

        let loaders = [];
        if (typeof options.root !== 'string') {
            throw Error('root must be specified');
        }

        options.suffix = options.suffix || '.js';
        options.prefix = options.prefix || '';
        options.filter = options.filter || [];

        const paths = this.walk(options.root);
        if (!paths) {
            return;
        }

        for (let key in paths) {

            let name = path.relative(path.resolve(this.runtimePath, options.root), paths[key]);
            let regExp = new RegExp(`${ options.suffix }$`);

            if (regExp.test(name)) {
                name = name.slice(0, name.lastIndexOf(options.suffix));

                options.filter.forEach(function (v, i) {
                    name = name.replace(v, '');
                });

                name = options.prefix + name;
                name = name.replace(/\\/g, '/');

                let lib = require(paths[key]);
                if (lib.hasOwnProperty('default') && Object.keys(lib).length == 1) {
                    loaders[name] = lib.default;
                } else {
                    loaders[name] = lib;
                }
            }
        }

        return loaders;
    }

    concat(arr1, arr2) {

        let arr = arr1;

        for (let key in arr2) {
            arr[key] = arr2[key];
        }

        return arr;
    }
}
//# sourceMappingURL=loader.class.js.map
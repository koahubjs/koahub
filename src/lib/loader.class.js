import path from "path";
import fs from "fs";

export default class {

    constructor(options) {

        var loaders = [];

        if (options instanceof Array) {
            for (var option of options) {
                loaders = this.concat(loaders, this.loader(option));
            }
        } else {
            loaders = this.loader(options);
        }

        return loaders;
    }

    walk(dir) {

        dir = path.resolve(process.cwd(), dir);

        var exist = fs.existsSync(dir);
        if (!exist) {
            return;
        }

        var files = fs.readdirSync(dir);
        var list = [];

        for (var file of files) {
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

        var loaders = [];
        if (typeof options.root !== 'string') {
            throw Error('root must be specified');
        }

        options.suffix = options.suffix || '.js';
        options.prefix = options.prefix || '';
        options.filter = options.filter || [];

        var paths = this.walk(options.root);
        if (!paths) {
            return;
        }

        paths.forEach(function (value, index) {
            var _path = path.relative(options.root, value);
            if (_path.lastIndexOf(options.suffix) != -1) {
                _path = _path.slice(0, _path.lastIndexOf(options.suffix));

                options.filter.forEach(function (v, i) {
                    _path = _path.replace(v, '');
                });

                _path = options.prefix + _path;
                _path = _path.replace(/\\/g, '/');

                let lib = require(value);
                if (lib.hasOwnProperty('default') && Object.keys(lib).length == 1) {
                    loaders[_path] = lib.default;
                } else {
                    loaders[_path] = lib;
                }
            }
        });

        return loaders;
    }

    concat(arr1, arr2) {

        var arr = arr1;

        for (var key in arr2) {
            arr[key] = arr2[key];
        }

        return arr;
    }
}

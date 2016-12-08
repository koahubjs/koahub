"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var _shelljs = require("shelljs");

var _shelljs2 = _interopRequireDefault(_shelljs);

var _watcher = require("./../util/watcher.util");

var _watcher2 = _interopRequireDefault(_watcher);

var _index = require("./../config/index.config");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFile(path) {
    return _fs2.default.existsSync(path) && _fs2.default.statSync(path).isFile();
}

function fileCopy(src, dest) {
    _fs2.default.writeFileSync(dest, _fs2.default.readFileSync(src));
}

_commander2.default.version('1.0.0');

_commander2.default.command('start [script]').description('koahub start script --watch --compile').option('-w, --watch', 'auto restart when a file is modified').option('-c, --compile', 'auto babel process when a file is modified').action(function (script, options) {

    if (!script) {
        script = _path2.default.join(_index2.default.app, 'index.js');
    }

    var regExpJs = new RegExp(".js$");
    if (!regExpJs.test(script)) {
        script = _path2.default.join(script, 'index.js');
    }

    var regExp = new RegExp("^" + _index2.default.app + "/?");
    if (!regExp.test(script)) {
        throw new Error('Project directory and the runtime directory can\'t be modified');
    }

    if (!isFile(script)) {
        throw new Error('The `script` is not found.');
    }

    var rootPath = process.cwd();
    var appName = _index2.default.app;
    var appPath = _path2.default.resolve(rootPath, appName);
    var appFile = _path2.default.resolve(rootPath, script);
    var runtimeName = _index2.default.runtime;
    var runtimePath = _path2.default.resolve(rootPath, runtimeName);
    var runtimeFile = _path2.default.resolve(rootPath, script.replace(appName + "/", runtimeName + "/"));

    // 监控启动
    if (options.watch == true) {
        var _ret = function () {
            var startRuntimeProcess = function startRuntimeProcess(runtimeFile) {
                runtimeProcess.send('exit');
                runtimeProcess = _child_process2.default.fork(runtimeFile);
                runtimeProcess.on('message', function (msg) {
                    if (msg == 'restart') {
                        startRuntimeProcess(runtimeFile);
                    }
                });
            };

            // 启动运行时进程


            // 编译并且监控启动
            if (options.compile == true) {
                _shelljs2.default.exec("./node_modules/.bin/babel " + appName + "/ --out-dir " + runtimeName + "/");
            }

            var runtimeProcess = void 0;

            startRuntimeProcess(runtimeFile);

            // 监听进程退出，通知运行时进程退出
            process.on('SIGINT', function () {
                runtimeProcess.send('exit');
                process.exit(0);
            });

            // 开启文件监控
            (0, _watcher2.default)(function (file) {
                // 编译并且监控启动
                if (options.compile == true) {
                    var fileRuntimePath = file.replace(appName + "/", runtimeName + "/");
                    _shelljs2.default.exec("./node_modules/.bin/babel " + file + " --out-file " + fileRuntimePath);
                }
                startRuntimeProcess(runtimeFile);
            });

            return {
                v: void 0
            };
        }();

        if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
    }

    // 直接编译启动
    if (options.compile == true) {
        _shelljs2.default.exec("./node_modules/.bin/babel " + appName + "/ --out-dir " + runtimeName + "/");
    }

    // 直接启动
    require(runtimeFile);
});

_commander2.default.command('controller [name]').description('koahub create controller').action(function (name) {

    var templatePath = './node_modules/koahubjs/template';
    try {
        fileCopy(_path2.default.resolve(templatePath, 'controller/index.controller.js'), _path2.default.resolve(_index2.default.app, "controller/" + name + ".controller.js"));
    } catch (err) {
        throw new Error('No such file or directory, Please create the directory first.');
    }
});

_commander2.default.command('create [project]').description('koahub create project').action(function (project) {

    _shelljs2.default.exec('git clone https://github.com/einsqing/koahubjs-demo.git');
    _fs2.default.renameSync(_path2.default.resolve('koahubjs-demo'), _path2.default.resolve(project));
});

_commander2.default.parse(process.argv);

if (!_commander2.default.args.length) _commander2.default.help();
//# sourceMappingURL=koahub.js.map
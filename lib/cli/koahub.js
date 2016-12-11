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

var _watch = require("./../util/watch.util");

var _watch2 = _interopRequireDefault(_watch);

var _log = require("./../util/log.util");

var _index = require("./../config/index.config");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFileSync(path) {
    return _fs2.default.existsSync(path) && _fs2.default.statSync(path).isFile();
}

function fileCopySync(src, dest) {
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

    if (!isFileSync(script)) {
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
                runtimeProcess = _child_process2.default.fork(runtimeFile);
                runtimeProcess.on('exit', function (code, signal) {
                    if (runtimeProcess.connected == false) {
                        process.exit();
                    }
                });
            };

            var stopRuntimeProcess = function stopRuntimeProcess() {
                if (runtimeProcess) runtimeProcess.kill();
            };

            // 启动运行时进程


            // 编译并且监控启动
            if (options.compile == true) {
                _shelljs2.default.exec("./node_modules/.bin/babel " + appName + "/ --out-dir " + runtimeName + "/");
            }

            var runtimeProcess = void 0;

            startRuntimeProcess(runtimeFile);

            // 捕获SIGTERM退出信号
            process.on('SIGTERM', function () {
                stopRuntimeProcess();
                process.exit();
            });

            // 捕获未知错误
            process.on('uncaughtException', function (err) {
                (0, _log.debug)(err);
            });

            var time = new Date();
            var files = [];
            // 开启文件监控
            (0, _watch2.default)(function (filePath) {
                var compile = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


                if (options.compile == true && compile == true) {
                    var fileRuntimePath = filePath.replace(appName + "/", runtimeName + "/");
                    files.push({ filePath: filePath, fileRuntimePath: fileRuntimePath });
                }

                var newTime = new Date();
                var timeOut = setTimeout(function () {
                    if (files.length) {
                        for (var key in files) {
                            _shelljs2.default.exec("./node_modules/.bin/babel " + files[key].filePath + " --out-file " + files[key].fileRuntimePath);
                        }
                        // 未编译文件清空
                        files = [];
                    }
                    // 进程退出
                    stopRuntimeProcess();
                    // 进程启动
                    startRuntimeProcess(runtimeFile);
                }, 100);

                if (newTime - time <= 100) {
                    clearTimeout(timeOut);
                }

                time = newTime;
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

    var destFile = _path2.default.resolve(_index2.default.app, "controller/" + name + ".controller.js");
    var srcFile = _path2.default.resolve(process.mainModule.filename, '../../', 'template/controller/index.controller.js');

    fileCopySync(srcFile, destFile);
});

_commander2.default.command('create [project]').description('koahub create project').action(function (project) {

    _shelljs2.default.exec('git clone https://github.com/einsqing/koahubjs-demo.git');
    _fs2.default.renameSync(_path2.default.resolve('koahubjs-demo'), _path2.default.resolve(project));
});

_commander2.default.parse(process.argv);

if (!_commander2.default.args.length) _commander2.default.help();
//# sourceMappingURL=koahub.js.map
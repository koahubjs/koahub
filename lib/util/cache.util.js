"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cleanCache = cleanCache;
// remove require cache
function cleanCache(modulePath) {
    var module = require.cache[modulePath];
    // remove reference in module.parent
    if (module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(module), 1); //释放老模块的资源
    }
    require.cache[modulePath] = null; //缓存置空
}
//# sourceMappingURL=cache.util.js.map
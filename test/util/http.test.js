const {getModuleControllerAction} = require('./../../app/util/http.util');
const {urlObjToParam} = require('./../../app/util/default.util');
const assert = require('assert');
const Koahub = require('./../../app');

describe('http util', () => {

    let app;

    beforeEach(function () {
        app = new Koahub();
    });

    describe('getModuleControllerAction', () => {
        it('path / return home/index/index', () => {
            assert.deepEqual(getModuleControllerAction('/'), {
                module: 'home',
                controller: 'index',
                action: 'index'
            });
        });

        it('path /home return home/index/index', () => {
            assert.deepEqual(getModuleControllerAction('/home'), {
                module: 'home',
                controller: 'index',
                action: 'index'
            });
        });

        it('path /home/index return home/index/index', () => {
            assert.deepEqual(getModuleControllerAction('/home/index'), {
                module: 'home',
                controller: 'index',
                action: 'index'
            });
        });

        it('path /home/index/index return home/index/index', () => {
            assert.deepEqual(getModuleControllerAction('/home/index/index'), {
                module: 'home',
                controller: 'index',
                action: 'index'
            });
        });

        it('path /admin return home/index/index', () => {
            assert.deepEqual(getModuleControllerAction('/admin'), {
                module: 'admin',
                controller: 'index',
                action: 'index'
            });
        });

        it('path /admin/index return home/index/index', () => {
            assert.deepEqual(getModuleControllerAction('/admin/index'), {
                module: 'admin',
                controller: 'index',
                action: 'index'
            });
        });

        it('path /admin/index/index return home/index/index', () => {
            assert.deepEqual(getModuleControllerAction('/admin/index/index'), {
                module: 'admin',
                controller: 'index',
                action: 'index'
            });
        });

        it('path /admin/index/index/index return /admin/index/index/index', () => {
            assert.deepEqual(getModuleControllerAction('/admin/index/index/index'), {
                module: 'admin',
                controller: 'index/index',
                action: 'index'
            });
        });
    });

    describe('urlObjToParam', () => {
        it('query null, obj {id: 1} return ?id=1', () => {
            assert.equal(urlObjToParam('', {id: 1}), '?id=1');
        });

        it('query null, obj {id: 1, name: 2} return ?id=1&name=2', () => {
            assert.equal(urlObjToParam('', {id: 1, name: 2}), '?id=1&name=2');
        });

        it('query name=2, obj {id: 1} return ?id=1&name=2', () => {
            assert.equal(urlObjToParam('name=2', {id: 1}), '?id=1&name=2');
        });
    });

});

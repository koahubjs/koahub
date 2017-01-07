import path from "path";
import Koahub from "./../../src";
import request from "supertest";
import Loader from "./../../src/lib/loader.class";

describe('http controller', function () {

    let app;

    before(function () {
        app = new Koahub();

        koahub.controllers = new Loader(path.resolve(__dirname, 'app'), [{
            root: 'controller',
            suffix: '.controller.js',
            prefix: '/',
        }]);

        app.loadModules();

        app.run(3000);
    });

    describe('http request', function () {

        it('call http should response 200', function (done) {
            request(app.getServer())
                .get('/home/index/index')
                .expect(200, done());
        });

        it('call http should response 200 body Hello World!', function (done) {
            request(app.getServer())
                .get('/home/index/index')
                .expect(200, function (err, res) {
                    if (err) throw err;

                    if (res.text != 'Hello World!') {
                        throw new Error('body response is error');
                    }
                    done();
                });
        });
    });
});



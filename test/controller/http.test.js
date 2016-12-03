import Koahub from "./../../src";
import request from "supertest";
import Loader from "./../../src/lib/loader.class";

describe('http controller', function () {

    let app;

    before(function () {
        app = new Koahub();

        koahub.controllers = new Loader([{
            root: __dirname + '/app/controller',
            suffix: '.controller.js',
            prefix: '/',
        }]);

        koahub.configs = {
            index: {
                watcher: false
            }
        };

        app.run(3000);
    });

    describe('http request', function () {

        it('call http should response 200', function (done) {
            request(app.getServer())
                .get('/home/index/index')
                .expect(200, done());
        });

        it('call http should response 200 body 1', function (done) {
            request(app.getServer())
                .get('/home/index/index')
                .expect(200, function (err, res) {
                    if (err) throw err;

                    if (res.body != '1') {
                        throw new Error('body response is error');
                    }
                    done();
                });
        });
    });
});



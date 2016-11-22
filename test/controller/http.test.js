import Koahub from "./../../src";
import request from "supertest";
import Loader from "./../../src/lib/loader.class";

describe('http controller', function () {

    let app, configDefault;

    before(function () {
        app = new Koahub();

        configDefault = {

            //自动加载配置
            loader: {
                "controller": [{
                    root: __dirname + '/app/controller',
                    suffix: '.controller.js',
                    prefix: '/',
                }]
            }
        }

        koahub.controllers = new Loader(configDefault.loader.controller);

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



import path from "path";
import Koahub from "./../../src";
import request from "supertest";
import Loader from "./../../src/lib/loader.class";

let app;

describe('hook controller', function () {

    beforeEach(function () {
        app = new Koahub({root: __dirname});

        app.loadHttpMiddlewares();
    });

    describe('hook http', function () {
        it('call http1 should response 200', function (done) {
            request(app.getServer())
                .get('/home/hook/http1')
                .expect(200)
                .expect('true')
                .end(done);
        });

        it('call http2same should response 200', function (done) {
            request(app.getServer())
                .get('/home/hook/http2same')
                .expect(200)
                .expect('true')
                .end(done);
        });

        it('call http2diff should response 200', function (done) {
            request(app.getServer())
                .get('/home/hook/http2diff')
                .expect(200)
                .expect('true')
                .end(done);
        });

        it('call http1run should response 200', function (done) {
            request(app.getServer())
                .get('/home/hook/http1run')
                .expect(200)
                .expect('Hello World!')
                .end(done);
        });

        it('call http2all should response 200', function (done) {
            request(app.getServer())
                .get('/home/hook/http2all')
                .expect(200)
                .expect('true')
                .end(done);
        });
    });

    describe('hook function', function () {
        it('call fun1 should response 200', function (done) {
            request(app.getServer())
                .get('/home/hook/fun1')
                .expect(200)
                .expect('3')
                .end(done);
        });
    });

});



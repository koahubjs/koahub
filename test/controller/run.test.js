import Koahub from "./../../app";
import request from "supertest";

let app, server;

describe('run test', function () {

    beforeEach(function () {
        app = new Koahub({root: __dirname});
    });

    describe('run server', function () {

        beforeEach(function () {
            server = app.getServer();
            app.run();
        });

        afterEach(function () {
            server.close();
        });

        it('call http should response 200', function (done) {
            request(app.getServer())
                .get('/home/index/index')
                .expect(200)
                .expect('Hello World!')
                .end(done);
        });
    });

    describe('run no server', function () {

        beforeEach(function () {
            app.run();
        });

        afterEach(function () {
            app.server.close();
        });

        it('call http should response 200', function (done) {
            request(app.getServer())
                .get('/home/index/index')
                .expect(200)
                .expect('Hello World!')
                .end(done);
        });
    })

});
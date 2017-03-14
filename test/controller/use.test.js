import Koahub from "./../../src";
import request from "supertest";

let app, koa, server;

describe('use test', function () {

    beforeEach(function () {
        app = new Koahub();
    });

    describe('use middleware', function () {

        it('koa middleware async', function (done) {
            app.use(async function (ctx, next) {
                ctx.body = 'Hello Use';
            });

            request(app.getServer())
                .get('/')
                .expect(200)
                .expect('Hello Use')
                .end(done)
        });

        it('koa middleware generator', function (done) {
            app.use(function *(next) {
                this.body = 'Hello Use Generator';
            });

            request(app.getServer())
                .get('/')
                .expect(200)
                .expect('Hello Use Generator')
                .end(done)
        });
    })

    describe('use express middleware', function () {

        it('express middleware', function (done) {
            app.useExpress(function (req, res, next) {
                res.statusCode = 200
                res.end('Hello Express')
            });

            request(app.getServer())
                .get('/')
                .expect(200)
                .expect('Hello Express')
                .end(done)
        });
    })
});
import Koa from "koa";
import request from "supertest";
import skip from "../../src/middleware/skip.middleware";

describe('skip middleware', function () {
    var middleware;

    beforeEach(function () {
        middleware = function (ctx, next) {
            ctx.body = {executed: true};
        };

        middleware.skip = skip;
    });

    describe('with PATH exception', function () {
        it('should not call the middleware when one of the path match', function (done) {
            var app = new Koa();

            app.use(middleware.skip({path: ['/foo']}));
            request(app.listen())
                .get('/foo')
                .expect(404, done);
        });

        it('should call the middleware when the path doesnt match', function (done) {
            var app = new Koa();

            app.use(middleware.skip({path: ['/foo']}));
            request(app.listen())
                .get('/bar')
                .expect(200, done);
        });
    });

    describe('with PATH (regexp) exception', function () {
        it('should not call the middleware when the regex match', function (done) {
            var app = new Koa();

            app.use(middleware.skip({path: ['/foo', /ar$/ig]}));
            request(app.listen())
                .get('/bar')
                .expect(404, done);
        });
    });

    describe('with PATH (useOriginalUrl) exception', function () {
        it('should not call the middleware when one of the path match ctx.url instead of ctx.originalUrl', function (done) {
            var app = new Koa();

            app.use(function (ctx, next) {
                ctx.url = '/foo';
                return next();
            });
            app.use(middleware.skip({path: ['/foo'], useOriginalUrl: false}));
            request(app.listen())
                .get('/orig/foo')
                .expect(404, done);
        });

        it('should call the middleware when the path doesnt match ctx.url even if path matches ctx.originalUrl', function (done) {
            var app = new Koa();

            app.use(function (ctx, next) {
                ctx.originalUrl = '/foo';
                return next();
            });
            app.use(middleware.skip({path: ['/foo'], useOriginalUrl: false}));
            request(app.listen())
                .get('/bar')
                .expect(200, done);
        });
    });

    describe('with EXT exception', function () {
        it('should not call the middleware when the ext match', function (done) {
            var app = new Koa();

            app.use(middleware.skip({ext: ['html', 'css']}));
            request(app.listen())
                .get('/index.html')
                .expect(404, done);
        });

        it('should call the middleware when the ext doesnt match', function (done) {
            var app = new Koa();

            app.use(middleware.skip({ext: ['html', 'css']}));
            request(app.listen())
                .get('/index.js')
                .expect(200, done);
        });
    });

    describe('with METHOD exception', function () {
        it('should not call the middleware when the method match', function (done) {
            var app = new Koa();

            app.use(middleware.skip({method: ['GET', 'OPTIONS']}));
            request(app.listen())
                .get('/index')
                .expect(404, done);
        });

        it('should call the middleware when the method doesnt match', function (done) {
            var app = new Koa();

            app.use(middleware.skip({method: ['GET', 'OPTIONS']}));
            request(app.listen())
                .post('/index')
                .expect(200, done);
        });
    });

    describe('with custom exception', function () {
        it('should not call the middleware when the custom rule match', function (done) {
            var app = new Koa();

            app.use(middleware.skip(function (ctx) {
                return ctx.url === '/index';
            }));
            request(app.listen())
                .get('/index')
                .expect(404, done);
        });

        it('should call the middleware when the custom rule doesnt match', function (done) {
            var app = new Koa();

            app.use(middleware.skip(function (ctx) {
                return ctx.url === '/index';
            }));
            request(app.listen())
                .get('/home')
                .expect(200, done);
        });
    });
});

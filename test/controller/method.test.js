const Koahub = require('./../../app');
const request = require('supertest');

let app;

describe('method controller', function () {

    beforeEach(function () {
        app = new Koahub({root: __dirname});
    });

    describe('method test', function () {

        beforeEach(function () {
            app.loadHttpMiddlewares();
        });

        it('call get /home/method/is_get should response 200', function (done) {
            request(app.getServer())
                .get('/home/method/is_get')
                .expect(200)
                .expect('true')
                .end(done);
        });

        it('call post /home/method/is_get should response false', function (done) {
            request(app.getServer())
                .post('/home/method/is_get')
                .expect(200)
                .expect('false')
                .end(done);
        });

        it('call get /home/method/is_post should response 200', function (done) {
            request(app.getServer())
                .get('/home/method/is_post')
                .expect(200)
                .expect('false')
                .end(done);
        });

        it('call get /home/method/is_post should response 200', function (done) {
            request(app.getServer())
                .post('/home/method/is_post')
                .expect(200)
                .expect('true')
                .end(done);
        });

        it('call post /home/method/is_post_id should response 200', function (done) {
            request(app.getServer())
                .post('/home/method/is_post_id')
                .field('id', '1')
                .expect(200)
                .expect('1')
                .end(done);
        });

        it('call header /home/method/is_ajax should response 200', function (done) {
            request(app.getServer())
                .get('/home/method/is_ajax')
                .set('X-Requested-With', 'XMLHttpRequest')
                .expect(200)
                .expect('true')
                .end(done);
        });

        it('call header /home/method/is_pjax should response 200', function (done) {
            request(app.getServer())
                .get('/home/method/is_pjax')
                .set('X-PJAX', 'true')
                .expect(200)
                .expect('true')
                .end(done);
        });

        it('call get /home/method/is_pjax should response false', function (done) {
            request(app.getServer())
                .get('/home/method/is_pjax')
                .expect(200)
                .expect('false')
                .end(done);
        });

        it('call get /home/method/is_method should response true', function (done) {
            request(app.getServer())
                .get('/home/method/is_method')
                .expect(200)
                .expect('true')
                .end(done);
        });

        it('call get /home/method/json_body should response {data: 1}', function (done) {
            request(app.getServer())
                .get('/home/method/json_body')
                .expect(200)
                .expect({data: 1})
                .end(done);
        });

        it('call get /home/method/json_body_msg should response {data: 1, msg: 2}', function (done) {
            request(app.getServer())
                .get('/home/method/json_body_msg')
                .expect(200)
                .expect({data: 1, msg: 2})
                .end(done);
        });

        it('call get /home/method/json_body_msg_code should response {data: 1, msg: 2, code: 3}', function (done) {
            request(app.getServer())
                .get('/home/method/json_body_msg_code')
                .expect(200)
                .expect({data: 1, msg: 2, code: 3})
                .end(done);
        });

        it('call get /home/method/json_success should response {data: 1, msg: 2, code: 1}', function (done) {
            request(app.getServer())
                .get('/home/method/json_success')
                .expect(200)
                .expect({data: 1, msg: 2, code: 1})
                .end(done);
        });

        it('call get /home/method/json_error should response {data: 1, msg: 2, code: 0}', function (done) {
            request(app.getServer())
                .get('/home/method/json_error')
                .expect(200)
                .expect({data: 1, msg: 2, code: 0})
                .end(done);
        });

        it('call get /home/method/download_file should response file.zip', function (done) {
            request(app.getServer())
                .get('/home/method/download_file')
                .expect(200)
                .end(done);
        });
    });

    describe('ctx method test', function () {

        beforeEach(function () {
            app.use(function (ctx, next) {
                ctx.render = function *(a, b) {
                    return a + b;
                }
                return next();
            });
            app.loadHttpMiddlewares();
        });

        it('call get / should response 3', function (done) {
            request(app.getServer())
                .get('/home/method/gen')
                .expect(200)
                .expect('3')
                .end(done);
        });
    });
});



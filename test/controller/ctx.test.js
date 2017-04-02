const Koahub = require('./../../app');
const request = require('supertest');

let app;

describe('ctx controller', function () {

    beforeEach(function () {
        app = new Koahub({root: __dirname});
        app.loadHttpMiddlewares();
    });

    it('call /home/count/index should response 200', function (done) {
        request(app.getServer())
            .get('/home/count/index')
            .expect(200)
            .expect('6')
            .end(done);
    });

    it('call /home/count/notfound should response This is a _empty!', function (done) {
        request(app.getServer())
            .get('/home/count/notfound')
            .expect(200)
            .expect('This is a _empty!')
            .end(done);
    });

    it('call /ctx/t_constructor/index should response 200', function (done) {
        request(app.getServer())
            .get('/ctx/t_constructor/index')
            .expect(200)
            .expect('Hello Constructor!')
            .end(done);
    });

    it('call /ctx/t_initialize/index should response 200', function (done) {
        request(app.getServer())
            .get('/ctx/t_initialize/index')
            .expect(200)
            .expect('_initialize')
            .end(done);
    });

    it('call /ctx/t_before/index should response 200', function (done) {
        request(app.getServer())
            .get('/ctx/t_before/index')
            .expect(200)
            .expect('Hello _before!')
            .end(done);
    });

    it('call /ctx/t_before_index/index should response 200', function (done) {
        request(app.getServer())
            .get('/ctx/t_before_index/index')
            .expect(200)
            .expect('Hello _before_index!')
            .end(done);
    });

    it('call /ctx/t_after_index/index should response 200', function (done) {
        request(app.getServer())
            .get('/ctx/t_after_index/index')
            .expect(200)
            .expect('Hello _after_index!')
            .end(done);
    });

    it('call /ctx/t_after/index should response 200', function (done) {
        request(app.getServer())
            .get('/ctx/t_after/index')
            .expect(200)
            .expect('Hello _after!')
            .end(done);
    });
});



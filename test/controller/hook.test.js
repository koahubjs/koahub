const Koahub = require('./../../app');
const request = require('supertest');

let app;

describe('hook controller', function () {

    beforeEach(function () {
        app = new Koahub({root: __dirname});
        app.loadHttpMiddlewares();
    });

    describe('hook function', function () {
        it('call fun1 should response 200', function (done) {
            request(app.getServer())
                .get('/home/hook/fun1')
                .expect(200)
                .expect('3')
                .end(done);
        });

        it('call fun2 should response 200', function (done) {
            request(app.getServer())
                .get('/home/hook/fun2')
                .expect(200)
                .expect('true')
                .end(done);
        });
    });

});



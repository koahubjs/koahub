import Koahub from "./../../app";
import request from "supertest";

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
});



const Koahub = require('./../../app');
const assert = require('assert');
const socket = require('socket.io');

let app, io, server;

describe('socket test io instanceof of socket.io', function () {

    app = new Koahub();
    io = app.getSocket(socket);
    server = app.getServer();
    app.run();

    assert(io instanceof socket);

    server.close();
});

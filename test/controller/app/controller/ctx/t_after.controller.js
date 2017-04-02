module.exports = class extends koahub.controller {

    index() {

    }

    _after() {
        this.view('Hello _after!');
    }
}

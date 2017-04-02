module.exports = class extends koahub.controller {

    index() {

    }

    _after_index() {
        this.view('Hello _after_index!');
    }

    _after() {
        this.view('Hello _after!');
    }
}

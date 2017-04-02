module.exports = class extends koahub.controller {

    _initialize() {
        this.view('_initialize');
    }

    _before() {
        this.view('Hello World!');
    }

    index() {
        this.view('Hello World!');
    }
}

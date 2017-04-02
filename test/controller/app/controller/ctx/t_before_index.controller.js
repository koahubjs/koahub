module.exports = class extends koahub.controller {

    _before_index() {
        this.view('Hello _before_index!');
    }

    index() {
        this.view('Hello World!');
    }
}

module.exports = class extends koahub.controller {

    _initialize() {
        this.num = 1;
    }

    _before() {
        this.num++;
    }

    _before_index() {
        this.num++;
    }

    index() {
        this.num++;
    }

    _after_index() {
        this.num++;
    }

    _after() {
        this.num++;
        this.view(this.num);
    }

    _empty() {
        this.view('This is a _empty!');
    }
}
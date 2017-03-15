module.exports = class extends koahub.controller {

    async _initialize() {
        this.num = 1;
    }

    async _before() {
        this.num++;
    }

    async _before_index() {
        this.num++;
    }

    async index() {
        this.num++;
    }

    async _after_index() {
        this.num++;
    }

    async _after() {
        this.num++;
        this.view(this.num);
    }

    async _empty() {
        this.view('This is a _empty!');
    }
}
module.exports = class extends koahub.controller {

    // throw unhandledRejection
    async index() {

        new Promise((resolve, reject) => {
            a.b = 1;
        });

        this.body = 'Hello World!';
    }
}
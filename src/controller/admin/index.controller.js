import base from "./base.controller";

export default class extends base {

    constructor() { //构造函数
        super();
    }

    sayGrade() {
        super.sayName();
        console.log('index sayGrade');

        super.json(1111);
    }
}
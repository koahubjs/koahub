import Knex from "knex";
import Bookshelf from "bookshelf";
import config from "./../config/db.config";

const knex = new Knex({
    client: 'mysql',
    connection: config
});

const bookshelf = new Bookshelf(knex);
bookshelf.plugin('pagination');

export default bookshelf;

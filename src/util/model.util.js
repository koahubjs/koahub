/**
 *
 * model常用方法
 * @param model
 * @param options
 * @returns {{model: model, handle: handle, add: add, del: del, get: get, getList: getList, getCount: getCount, getPageList: getPageList, getQueryList: getQueryList, getQueryCount: getQueryCount}}
 */

export default function (model, options) {

    let pageNum = 25;

    model = koahub.models[model];
    options = options || {};

    return {
        model: function () {
            return model;
        },
        handle: function (data) {
            if (typeof data === 'object' && data != null) {
                return data.toJSON();
            }
            return data;
        },
        add: async function (data) {
            if (!data.id) {
                delete data.id;
            }
            var data = await model.forge(data).save();
            return this.handle(data);
        },
        del: async function (condition) {
            var data = await model.forge(condition).destroy();
            return this.handle(data);
        },
        get: async function (condition) {
            var data = await model.query({where: condition}).fetch(options);
            return this.handle(data);
        },
        getList: async function (condition) {
            var data = await model.query({where: condition}).fetchAll(options);
            return this.handle(data);
        },
        getCount: async function (condition) {
            var data = await model.query({where: condition}).count();
            return this.handle(data);
        },
        getPageList: async function (page, callback, option) {
            if (option != undefined && option.pageNum != undefined) {
                pageNum = option.pageNum;
            }

            var data = await model.query(function (qb) {
                if (typeof callback === 'function') {
                    callback(qb);
                }

                qb.orderBy('id', 'desc');
            }).fetchPage({
                pageSize: pageNum,
                page: page,
                withRelated: options.withRelated
            });

            return {
                data: this.handle(data),
                pagination: data.pagination
            };
        },
        getQueryList: async function (callback) {
            var data = await model.query(function (qb) {
                if (typeof callback === 'function') {
                    callback(qb);
                }

                qb.orderBy('id', 'desc');
            }).fetchAll(options);

            return this.handle(data);
        },
        getQueryCount: async function (callback) {
            var data = await model.query(function (qb) {

                if (typeof callback === 'function') {
                    callback(qb);
                }
            }).count();

            return this.handle(data);
        }
    };
}
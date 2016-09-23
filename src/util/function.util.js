// es6 str js template
export function strToJsTemplate(template, data) {

    var keys = Object.keys(data),
        dataList;

    dataList = keys.map(function (key) {
        return data[key]
    });

    // 这里使用反引号来构建模板引擎
    return new Function(keys.join(','), 'return `' + template + '`;')
        .apply(null, dataList);
}
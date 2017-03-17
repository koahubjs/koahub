module.exports = {
    loader: {
        'addons': {
            root: 'addon',
            suffix: '.controller.js',
            prefix: '/addon/',
            filter: [/\/controller/]
        },
        'utils': {
            root: 'util'
        }
    }
}
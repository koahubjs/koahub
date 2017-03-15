export default {
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
    },

    session: true,

    cors: true,

    static: {
        dir: 'www'
    }
}
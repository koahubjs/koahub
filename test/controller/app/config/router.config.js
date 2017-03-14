export default [
    ['/product', '/home/router/index'],
    ['/product/:id', {
        get: '/home/router/detail'
    }]
]
module.exports = [
    ['/product', '/home/router/index'],
    ['/product/:id', {
        get: '/home/router/detail'
    }]
]
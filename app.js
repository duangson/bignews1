const express = require('express')
const server = express()

const cors = require('cors')
server.use(cors())

//设置uploads为静态资源目录
server.use('/uploads', express.static('uploads'))

//设置jwt
// const jwt = require('express-jwt')
// // app.use(jwt().unless());
// // jwt() 用于解析token，并将 token 中保存的数据 赋值给 req.user
// // unless() 约定某个接口不需要身份认证
// server.use(jwt({
//     secret: 'gz61',
//     algorithms: ['HS256']
// }).unless({
//     path: ['/api/login', '/api/register', /^\/uploads\/.*/]
// }))

//通过路由中间件来加载不同的路由
const userRouter = require('./router/user_router.js')
const accountRouter = require('./router/account_router.js')
const cateRouter = require('./router/cate_router.js')
server.use('/api', accountRouter)
server.use('/my', userRouter)
server.use('/my/article', cateRouter)

//错误处理中间件用来检查token的合法性
// server.use((err, req, res, next) => {
//     console.log('有错误', err);
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).send({ code: 1, message: '身份认证失败!' })
//     }
// })


server.listen(3000, () => {
    console.log('服务器已在3000端口就绪');
})
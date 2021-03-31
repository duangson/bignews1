const express = require('express')
const server = express()

const cors = require('cors')
server.use(cors())

//设置uploads为静态资源目录
server.use('/uploads', express.static('uploads'))


server.listen(3000, () => {
    console.log('服务器已在3000端口就绪');
})
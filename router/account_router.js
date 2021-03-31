const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
//const jwt = require('jsonwebtoken')
router.use(express.urlencoded())

//注册
router.post('/reguser', (req, res) => {
    console.log('收到的参数是:', req.body);

    const { username, password } = req.body
    // 2. 根据注册业务的要求，先去看一下名字有没有占用！
    //    根据用户名去做一次查询 如果找到了结果，说明名字被占用了，如果查询结果为空，说明
    //    名字可以使用
    const sqlStrSelect = `select username from users where username="${username}"`
    conn.query(sqlStrSelect, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: 500, msg: '服务器错误' })
            return
        }
        //console.log(result);

        if (result.length > 0) {
            res.json({ status: 1, msg: '注册失败，用户名被占用！' })
            return
        }
        const sqlStr = `insert into users(username,password) values("${username}","${password}")`
        console.log(sqlStr);
        conn.query(sqlStr, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ status: 500, msg: '用户名或者密码错误！' })
                return
            } else {
                res.json({ status: 0, msg: '注册成功' })
            }
        })
    })


})

//登录
router.post('/login', (req, res) => {
    console.log('收到的参数是：', req.body);

    const { username, password } = req.body
    // 2. 拼接sql字符串, 思路:根据用户名和密码去做查询，如果查找到了，说明登陆成功，
    //  查不到，说明错误
    const sqlStr = `select * from users where username="${username}" and password="${password}"`
    console.log(sqlStr);
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: 500, msg: '服务器错误!' })
            return
        }
        //console.log(result);
        if (result.length > 0) {
            res.json({ status: 0, msg: '登录成功！' })
        } else {
            res.json({ status: 1, msg: '登陆失败，用户名或者密码错误！' })
        }
    })

})




module.exports = router
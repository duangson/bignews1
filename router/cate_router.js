const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
//const jwt = require('jsonwebtoken')
router.use(express.urlencoded())



//获取文章分类列表
router.get('/cates', (req, res) => {
    console.log('收到的参数是：', req.query);
    const sqlStr = `select * from categories`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: 500, msg: '服务器错误！' })
            return
        }
        res.json({
            status: 0, msg: '获取文章分类列表成功！',
            data: result
        })
    })
})


//新增文章分类
router.post('/addcates', (req, res) => {
    console.log('收到的参数是：', req.body);
    const { name, slug } = req.body
    const sqlStr = `insert into categories (name,slug) values ("${name}","${slug}")`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: 500, msg: '服务器错误！' })
            return
        }
        res.json({ status: 0, msg: '新增成功' })
    })
})


//根据id删除文章分类
router.get('/deletecate', (req, res) => {
    //console.log('收到的参数是：', req.query);
    const { id } = req.query
    const sqlStr = `delete from categories where id="${id}"`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ status: 500, msg: '服务器错误！' })
            return
        }
        res.json({ status: 0, msg: '删除成功！' })
    })

})

//根据id获取文章分类数据
router.get('/getCatesById', (req, res) => {
    const { id } = req.query
    const sqlStr = `select *from categories where id="${id}"`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: 500, msg: '服务器错误！' })
            return
        }
        res.json({
            status: 0, msg: '获取文章分类列表成功！',
            data: result[0]
        })
    })
})


//根据id更新文章分类数据
router.post('/updatecate', (req, res) => {
    const { id, name, slug } = req.body
    const sqlStr = `update categories set name="${name}",slug="${slug}" where id="${id}"`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ status: 500, msg: '服务器错误！' })
            return
        }
        res.json({ status: 0, msg: '更新成功' })
    })
})






module.exports = router
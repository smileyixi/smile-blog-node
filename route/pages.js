const { createPage, getPage } = require('../func/pages')
const { jwtCheck } = require('../util/jwt')
const express = require('express')
const router = express.Router()


// 新增自定义页面
router.post('/pages/new', jwtCheck, (req, res)=>{
    createPage(req, res).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 查询自定义页面
router.get('/pages', (req, res)=>{
    getPage(req, res).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})



module.exports = router
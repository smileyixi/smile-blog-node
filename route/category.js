const { insertCategory, getCategoryList, getCategoryCount, findCategoryByCid } = require('../func/category')
const express = require('express')
const router = express.Router()

// 新增分类
router.post('/category/new', (req, res)=>{
    insertCategory(req, res).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 获取分类列表
router.get('/category/list', (req, res)=>{
    getCategoryList(req).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 获取聚合分类数量
router.get('/category/count', (req, res)=>{
    getCategoryCount(req).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 获取指定cid分类
router.get('/category', (req, res)=>{
    findCategoryByCid(req).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

module.exports = router
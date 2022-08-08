const { insertComment, getCommentListByaid, getCommnetCount } = require('../func/comment')
const express = require('express')
const router = express.Router()


// 插入评论到文章
router.post('/comment/new', (req, res)=>{
    insertComment(req, res).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 获取评论列表by aid
router.get('/comment/list', (req, res)=>{
    getCommentListByaid(req, res).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 获取文章下评论数量
router.get('/comment/count', (req, res)=>{
    getCommnetCount(req).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})



module.exports = router
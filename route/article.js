const { getArticleList, insertArticle, findArticleById, getArticleByUni, getNextById, getPreById, getArticleWithCategory, getArticleCount } = require('../func/article')
const express = require('express')
const router = express.Router()


// 查询文章列表
router.get('/blog/list', (req, res)=>{
    getArticleList(req, res).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 查询文章
router.get('/blog/article', (req, res)=>{
    findArticleById(req, res).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 文章详情
router.get('/blog/articleDetail', (req, res)=>{
    getArticleByUni(req, res).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 分类下文章
router.get('/blog/cateArt', (req, res)=>{
    getArticleWithCategory(req).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 新增文章
router.post('/blog/new', (req, res)=>{
    insertArticle(req, res).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 下一篇文章
router.get('/blog/next', (req, res)=>{
    getNextById(req, res).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 上一篇文章
router.get('/blog/pre', (req, res)=>{
    getPreById(req, res).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

// 查询文章总数
router.get('/blog/count', (req, res)=>{
    getArticleCount(req).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).send(err)
    })
})


module.exports = router
const { comments, childcomments } = require('../model/schema')
const { SuccessModel, ErrorModel} = require('../model/response')
const mongoose = require('mongoose')


/**
 * 插入评论
 * @param {*} req 
 */
const insertComment = (req, res) => {
    return new Promise((resolve, reject)=>{
        const data = req.body
        // 获取请求头ua
        const ua = req.headers['user-agent']||'none'

        // 插入主评论
        comments.create({
            author: data.author,
            callAuthor: data.callAuthor,
            aid: data.aid, 
            nid: data.nid,
            content: data.content,
            ua: ua,
            createAt: data.createAt||Date.now(),
            disComment: data.disComment||0  // 是否可以回复 1:开启；0禁用
        }, (err, docs)=> {
            if(err) return reject(new ErrorModel("插入评论失败！"))
            resolve(new SuccessModel(docs))
        })
    })
}


/**
 * 获取评论列表，获取评论数量
 * @param {*} req 
 */
const getCommentListByaid = (req, res) => {
    return new Promise((resolve, reject)=>{

        // 获取固定数量的最新评论
        if (req.query.limit !== '' && !req.query.aid) {
            comments.find().sort({_id: -1}).limit(parseInt(req.query.limit)).exec((err, docs)=>{
                if (err) return reject(new ErrorModel(err))
                resolve(new SuccessModel(docs))
            })

            return
        }

        const aid = req.query.aid
        comments.aggregate([
            {
                $match: {
                    aid: mongoose.Types.ObjectId(aid)
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "nid",
                    as: "childComments"
                }
            }
        ],(err, docs)=>{
            if (err) return reject(new ErrorModel(err))
            resolve(new SuccessModel(docs))
        })
    })
}


/**
 * 获取评论数量
 * @param {*} req [aid:文章id]
 */
const getCommnetCount = (req) => {
    return new Promise((resolve, reject)=> {
        if(!req.query.aid) {
            comments.find().count().exec((err, number)=>{
                if (err) return reject(new ErrorModel(err))
                resolve(new SuccessModel(number))
            })
        }
        comments.find({aid: req.query.aid}).count().exec((err, number)=>{
            if (err) return reject(new ErrorModel(err))
            resolve(new SuccessModel(number))
        })
    })
}

module.exports = {
    insertComment, getCommentListByaid, getCommnetCount, getCommnetCount
}
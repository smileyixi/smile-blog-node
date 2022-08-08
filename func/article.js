const { contents } = require('../model/schema')
const { SuccessModel, ErrorModel} = require('../model/response')
const mongoose = require('mongoose')


/**
 * 查询文章列表
 * @param {req} req [keyword, limit, random]
 * @param {res} res 
 * @returns 
 */
const getArticleList = (req, res)=>{ 
    return new Promise((resolve, reject)=>{
        if (!req.query.random && !req.query.all) {
            var reg = new RegExp(req.query.keyword, "i")
            var _filter = {
                $or: [
                    {title: {$regex: reg}},
                    {content: {$regex: reg}},
                ]
            }
            contents.aggregate([
                {
                    $match: _filter
                },
                {
                    $sort: {_id: -1}
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "cid",
                        foreignField: "_id",
                        as: "category"
                    },
                },
                {
                    $skip: parseInt(req.query.skip?req.query.skip:0)
                },
                { 
                    $limit: parseInt(req.query.limit?req.query.limit:6)
                }
            ]).exec((err, docs)=>{
                if(err) return reject(new ErrorModel('查询失败！'))
                // 最小化获取
                if(req.query.small) {
                    resolve(new SuccessModel([{
                        title: docs[0].title,
                        createAt: docs[0].createAt,
                        category: docs[0].category,
                        _id: docs[0]._id,
                    }]))
                    return
                }
                resolve(new SuccessModel(docs))
            })
        }
        // 随机查询指定数量的记录
        else if (req.query.random && req.query.limit && 0 < parseInt(req.query.limit) < 100) {
            try {
                let max = 6
                for(let i = 0; i < parseInt(req.query.limit); i++) {
                    contents.find().limit(-1).skip(parseInt(Math.random()*(max+1),10)).exec((err, docs)=>{
                        if(err) return reject(new ErrorModel('查询失败！'))
                        // 最小化获取
                        if(req.query.small) {
                            resolve(new SuccessModel({
                                title: docs[0].title,
                                _id: docs[0]._id,
                            }))
                            return
                        }
                        resolve(new SuccessModel(docs[0]))
                    })
                }
            } catch (error) {
                return contents.find().exec((err, docs)=>{
                    if(err) return reject(new ErrorModel('查询失败！'))
                    resolve(new SuccessModel(docs))
                })
            }
        }
        // 获取全部文章
        else {
            return contents.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "cid",
                        foreignField: "_id",
                        as: "category"
                    }
                }
            ]).then(result=>{
                if (req.query.small) {
                    let temp = []
                    result.forEach(doc => {
                        temp.push({
                            title: doc.title,
                            createAt: doc.createAt,
                            category: doc.category,
                            _id: doc._id
                        })
                    });
                    resolve(new SuccessModel(temp))
                }
                resolve(new SuccessModel(result))
            }).catch(err=>{
                reject(new ErrorModel('查询失败！'))
            })
        }
    })

}

/**
 * 查询文章
 * @param {req} req [id]
 * @param {res} res 
 * @returns
 */
const findArticleById = (req, res)=>{
    return new Promise((resolve, reject)=>{
        if (req.query.id && req.query.id.length==24) {
            contents.findById(req.query.id, (err, docs)=>{
                if(err)  return reject(new ErrorModel('查询失败！'))
                resolve(new SuccessModel(docs))
            })
        } else {
            reject(new ErrorModel('条件错误！'))
        }
    })
}

/**
 * 关联查询文章详情
 * @param {*} req [id]
 * @param {*} res 
 * @returns 
 */
 const getArticleByUni = (req, res)=>{
    return new Promise((resolve, reject)=>{
        contents.aggregate([
            {
                $match: {_id: mongoose.Types.ObjectId(req.query.id) }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "cid",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $lookup: {
                    from: "users",      // 关联表
                    localField: "uid",  // 当前表的字段
                    foreignField: "_id",// 关联表的字段
                    as: "author"        // 别名
                }
            }
        ], (err, docs)=>{
            if(err)  return reject(new ErrorModel('查询失败！'))
            docs[0].author = docs[0].author[0] && docs[0].author[0].username
            resolve(new SuccessModel(docs[0]))
            
        })
    })
}

/**
 * 查询指定分类文章
 * @param {*} req 
 * @param {*} res 
 */
const getArticleWithCategory = (req) => {
    return new Promise((resolve, reject)=>{
        let temp = []
        contents.find({cid: mongoose.Types.ObjectId(req.query.cid) }, (err, docs)=>{
            if(err)  return reject(new ErrorModel('查询失败！'))
            docs.forEach(doc => {
                temp.push({
                    title: doc.title,
                    createAt: doc.createAt,
                    _id: doc._id,
                    hot: doc.hot,
                })
            });
            resolve(new SuccessModel(temp))
        })
    })
}

/**
 * 插入文章
 * @param {req} req 
 * @param {res} res  
 * @returns
 */
const insertArticle = (req, res)=>{
    return new Promise((resolve, reject)=>{
        const data = req.body
        if(!data) {
            return reject(new ErrorModel('新增文章失败！'))
        }
        return contents.create({...data}).then(result=>{
            resolve(new SuccessModel(result._id))
        }).catch(()=>{
            reject(new ErrorModel('新增文章失败！'))
        })
    })
}

/**
 * 查询next
 * @param {*} req 
 * @returns 
 */
const getNextById = (req)=>{
    return new Promise((resolve, reject)=>{
        contents.find({ '_id' :{ "$gt" :mongoose.Types.ObjectId(req.query.id)} }).limit(1).sort({key:-1}).exec((err, docs)=>{
            if(err)  return reject(new ErrorModel('查询失败！'))
            if(docs.length==0) return resolve(new SuccessModel({}))
            resolve(new SuccessModel({
                title: docs[0].title,
                _id: docs[0]._id
            }))
        })
    })
}

/**
 * 查询pre
 * @param {*} req 
 * @returns 
 */
 const getPreById = (req)=>{
    return new Promise((resolve, reject)=>{
        contents.find({ '_id' :{ "$lt" :mongoose.Types.ObjectId(req.query.id)} }).exec((err, docs)=>{
            if(err)  return reject(new ErrorModel('查询失败！'))
            if(docs.length==0) return resolve(new SuccessModel({}))
            resolve(new SuccessModel({
                title: docs[docs.length-1].title,
                _id: docs[docs.length-1]._id
            }))
        })
        
    })
}

/**
 * 获取关键词文章总数 keyword
 * @param {*} req 
 * @returns 
 */
const getArticleCount = (req) => {
    return new Promise((resolve, reject)=>{
        var reg = new RegExp(req.query.keyword, "i")
        var _filter = {
            $or: [
                {title: {$regex: reg}},
                {content: {$regex: reg}},
            ]
        }
        resolve(contents.find(_filter).count())
    })
}



module.exports = {
    getArticleList, insertArticle, findArticleById, getArticleByUni, getNextById, getPreById, getArticleWithCategory, getArticleCount
}

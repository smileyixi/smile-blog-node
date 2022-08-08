const { category, contents } = require('../model/schema')
const { SuccessModel, ErrorModel} = require('../model/response')
const mongoose = require('mongoose')

/**
 * 插入分类
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
 const insertCategory = (req)=>{
    return new Promise((resolve, reject)=>{
        const data = req.body
        return category.create({
            title: data.title,
            description: data.description
        },(err, docs)=>{
            if(err) {
                return reject(new ErrorModel(err.message))
            }
            resolve(new SuccessModel(docs))
        })
    })
}


/**
 * 获取分类列表 [limit]
 * @param {Object} req 
 */
const getCategoryList = (req)=>{
    return new Promise((resolve, reject)=>{
        const limit = req.query.limit

        if(limit) {
            category.find().limit(parseInt(limit)).exec((err, docs)=>{
                if(err) return reject(new ErrorModel(err))
                resolve(new SuccessModel(docs))
            })
        }
        else {
            category.find().exec((err, docs)=>{
                if(err) return reject(new ErrorModel(err))
                resolve(new SuccessModel(docs))
            })
        }
    })

}

/**
 * 获取聚合分类数量
 * @param {Object} req [cid]
 */
const getCategoryCount = (req)=>{
    return new Promise((resolve, reject)=>{
        data = req.query
        if(data.cid && data.cid.length == 24) {
            contents.find({cid: mongoose.Types.ObjectId(data.cid)}).count().exec((err, docs)=>{
                if(err) return reject(new ErrorModel('查询失败！'))
                resolve(new SuccessModel(docs))
            })
        }else if(data.cid.length != 24) {
            return resolve(new ErrorModel('cid format error!'))
        }
    })
}

/**
 * 查询分类根据cid
 * @param {Object} req [cid]
 */
const findCategoryByCid = (req)=>{
    return new Promise((resolve, reject)=>{
        category.find({_id: mongoose.Types.ObjectId(req.query.cid) }, (err, docs)=>{
            if(err)  return reject(new ErrorModel('查询失败！'))
            resolve(new SuccessModel(docs[0]))
        })
    })
}

module.exports = {
    insertCategory, getCategoryList, getCategoryCount, findCategoryByCid
}
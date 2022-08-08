const { pages } = require('../model/schema')
const { SuccessModel, ErrorModel} = require('../model/response')

/**
 * 创建page页面
 * @param {*} req 
 * @param {*} res 
 */
const createPage =  (req, res) => {
    return new Promise((resolve, reject)=>{
        const data = req.body
        if(!data) {
            return reject(new ErrorModel('post err'))
        }
        // 查询page字段是否重复
        pages.findOne({page: data.page}, (err, doc)=>{
            if(doc) {
                if(err) return reject(new ErrorModel(err))
                return resolve(new ErrorModel('页面路径已存在'))
            } else {
                // 创建
                pages.create({
                    page: data.page,
                    title: data.title,
                    meta: data.meta,
                    content: data.content,
                    isMark: data.isMark,
                    createAt: data.createAt?data.createAt:Date.now(),
                    disComment: data.disComment
                }, (err, doc)=>{
                    if(err) return reject(new ErrorModel(err))
                    resolve(new SuccessModel(doc.page)) // 传递page name
                })
            }
        })
    })
}


/**
 * 查询page页面, 或者页面列表
 * @param {*} req {page} 页面名称
 * @param {*} res 
 */
const getPage =  (req, res) => {
    return new Promise((resolve, reject)=>{
        const data = req.query
        // 获取全部页面
        if(data == {} || !data.page) {
            pages.find({}, {page: 1}, (err, docs)=>{
                if(err) return reject(new ErrorModel(err))
                resolve(new SuccessModel(docs))
            })
        } else {
            pages.findOne({
                page: data.page
            }, (err, doc)=>{
                if(err) return reject(new ErrorModel(err))
                resolve(new SuccessModel(doc))
            })
        }
        
    })
}




module.exports = {
    createPage, getPage
}
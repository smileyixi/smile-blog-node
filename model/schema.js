const { Schema } = require('mongoose')
const mongoose = require('mongoose')

// 用户表
const users = mongoose.model("users", mongoose.Schema({
    username: {type:String, required: true, unique: true},
    password: {type:String, required: true,
        set(val) {  // 加密密码
            return require('bcrypt').hashSync(val, 10)
        }    
    },
    autograph: {type: String},  // 个性签名
    email: {type: String},      // 个人邮箱
    usersite: {type: String},   // 用户网站
}))

// 设置表
const options = mongoose.model('options', mongoose.Schema({
    siteTitle: {type: String, required: true},
    siteUrl: {type: String, required: true},
    description: {type: String, default: 'just so so..'},
    keywords: String,
    disRegister: {type:Number, default: 1}  // 普通用户是否可以注册 1:开启；0禁用
}))

// 评论表
const comments = mongoose.model("comments", mongoose.Schema({
    aid: {type: Schema.Types.ObjectId, required: true},  // 评论所属的文章id
    nid: {type: Schema.Types.ObjectId},  // 父评论id
    author: {type: String, required: true}, // 作者名称
    callAuthor: {type: String}, // 作者名称
    ua: String,     // 用户UserAgent
    content: String,
    createAt: {type: Date, default: Date.now()},
    disComment: {type:Number, default: 0}  // 是否可以回复 1:开启；0禁用
}))

// 文章表
const contents = mongoose.model("contents", mongoose.Schema({
    title: {type: String, required: true, index: true},
    cid: {type: Schema.Types.ObjectId},  // 分类id
    author: String,                      // 用户名
    uid: {type: Schema.Types.ObjectId},  // 用户id
    content: {type: String, required: true},
    createAt: {type: Date, default: Date.now()},
    hot: {type:Number, default: 10},
    disComment: {type:Number, default: 0}  // 是否可以评论 1:开启；0禁用
}))

// 自定义页面表
const pages = mongoose.model("pages", mongoose.Schema({
    page: {type: String, required: true, index: true},      // 自定义页面唯一名称
    title: String,  // 页面标题
    meta: String,   // 页面描述
    isMark: {type: Boolean, default: true}, // 是否为Markdown
    content: {type: String, required: true},
    createAt: {type: Date, default: Date.now()},
    disComment: {type:Number, default: 0}  // 是否可以评论 1:开启；0禁用
}))

// 分类表
const category = mongoose.model("category", mongoose.Schema({
    title: {type: String, unique: true, required: true},
    description: String,
    createAt: {type: Date, default: Date.now()},
    count: {type: Number, default: 0}
}))

 
module.exports = {
    users,contents,category,comments,pages,options
}
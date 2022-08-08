const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const monggose = require('mongoose')

// 用户表
const users = monggose.model("users", monggose.Schema({
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

// 评论表
const comments = monggose.model("comments", monggose.Schema({
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
const contents = monggose.model("contents", monggose.Schema({
    title: {type: String, required: true, index: true},
    cid: {type: Schema.Types.ObjectId},  // 分类id
    author: String,                      // 用户名
    uid: {type: Schema.Types.ObjectId},  // 用户id
    content: {type: String, required: true},
    createAt: {type: Date, default: Date.now()},
    hot: {type:Number, default: 10},
    disComment: {type:Number, default: 0}  // 是否可以评论 1:开启；0禁用
}))

// 文章表 - 自定义页面
const pages = monggose.model("pages", monggose.Schema({
    page: {type: String, required: true, index: true},      // 自定义页面唯一名称
    title: String,  // 页面标题
    meta: String,   // 页面描述
    isMark: {type: Boolean, default: true}, // 是否为Markdown
    content: {type: String, required: true},
    createAt: {type: Date, default: Date.now()},
    disComment: {type:Number, default: 0}  // 是否可以评论 1:开启；0禁用
}))

// 分类表
const category = mongoose.model("category", monggose.Schema({
    title: {type: String, unique: true, required: true},
    description: String,
    createAt: {type: Date, default: Date.now()},
    count: {type: Number, default: 0}
}))

 
module.exports = {
    users,contents,category,comments,pages
}
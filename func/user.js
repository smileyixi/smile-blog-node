const { users } = require('../model/schema')
const { SuccessModel, ErrorModel} = require('../model/response')
const { jwtSign, jwtCheck } = require('../util/jwt')

/**
 * 创建用户
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createUser = (req, res)=>{
    return new Promise((resolve, reject)=>{
        const data = req.body

        users.create({
            username: data.username,
            password: data.password,
            autograph: data.autograph,
            emial: data.emial,
            usersite: data.usersite
        },(err, docs)=>{
            if(err) {
                return res.status(422).send(new ErrorModel('用户已存在！'))
            }
            resolve(res.send(new SuccessModel('注册成功！')))
        })
    })
}

/**
 * 用户登陆
 * @param {*} req {username, password}
 * @param {*} res 
 * @returns 
 */
const verifyUser = (req, res) => {
    return new Promise((resolve, reject)=>{
        const data = req.body
        users.findOne({username: data.username}, (err, user)=>{
            if(!user){
                // 如果是false,查不到用户 进入
                return res.status(422).send(new ErrorModel('用户名不存在'))
            }

            // 比较加密密码和不加密密码
            const passwordIsTrue = require('bcrypt').compareSync(data.password, user.password)
            if(!passwordIsTrue) {
                return res.status(422).send(new ErrorModel('密码错误！'))
            }

            // 设置token
            const token = jwtSign({id: String(user._id),})
            
            // 发送token
            res.send({
                data: {
                    user, token, createTime: new Date()
                },
                error: 0
            })
        })

    })
}


module.exports = {
    createUser, verifyUser
}
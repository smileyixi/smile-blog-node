const { createUser, verifyUser } = require('../func/user')
const { jwtCheck } = require('../util/jwt')
const express = require('express')
const router = express.Router()

// 新增用户
router.post('/user/register', jwtCheck, (req, res)=>{
    createUser(req, res).catch(err=>{
        res.status(400).json(err)
    })
})

// 用户登陆
router.post('/user/login', (req, res)=>{
    verifyUser(req, res)
})


// 校验token
router.post('/verify', jwtCheck , (req, res)=>{
    res.status(200).send({
        code: '100001',
        msg: '验证过通'
    })
})


module.exports = router
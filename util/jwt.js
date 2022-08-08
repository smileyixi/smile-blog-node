const CONFIG = require('../config/index')
const jwt = require('jsonwebtoken')

const jwtSign = (data) => { // token生成函数，有效时间为两个小时
  const token = jwt.sign(data, CONFIG.SECERT, {expiresIn: 60 * 60 * 2})
  return token
}

const jwtCheck = (req, res, next) => { // token验证函数
  const token = req.headers.authorization
  // 没有token，未登陆
  if (!token) return res.status(401).send({
    msg: '未登陆',
    code: '100003'
  })

  jwt.verify(token, CONFIG.SECERT, (err, data) => {
    if (err) {
      res.status(403).send({
        msg: 'token无效或者已过期',
        code: '100000'
      })
    } else {
      req.jwtInfo = data
      next()
    }
  })
}

module.exports = {
  jwtSign,
  jwtCheck
}

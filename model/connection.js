// 连接数据库模块

const mongoose  = require('mongoose')

module.exports = (database) => {
    mongoose.connect(`mongodb://localhost:27017/${database}`)
        let db = mongoose.connection
        db.on('error', ()=>{
            console.log(`[-] 连接失败! : ${database}`)
        })
        db.once('open', ()=> {
            console.log(`[+] 连接成功！ : ${database}`)
    })
}
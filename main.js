const express = require('express')
const connection = require('./model/connection')
const bodyParser = require('body-parser')

const OPTIONS = require('./config/db')
connection(OPTIONS.database)

const app = express()
app.use(bodyParser.json({extended:false}))  // body解构

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

app.use('/api', require('./route/article'))
app.use('/api', require('./route/user'))
app.use('/api', require('./route/category'))
app.use('/api', require('./route/comment'))
app.use('/api', require('./route/pages'))

app.use(function(req, res, next) {
    var err = new Error('Not Found')
    res.status(404).send(err)
    next(err);
});

app.listen(8888, ()=>{
    console.log('[+] server running at http://127.0.0.1:8888')
})
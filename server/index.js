/**
 * Created by vamgoon on 2017/5/24.
 */
const express = require('express');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
var ueditor = require('ueditor')
const url = require('url')
const fs = require('fs')
const path = require('path')
const app = express();

const api = require('./api.js')

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api)
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  name: 'sessId',
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 100 * 1000 }
}));

app.use('/static/ueditor/test', ueditor(__dirname, function(req, res, next) {
  var imgDir = '/img/' //默认上传地址为图片
  var ActionType = req.query.action;
  if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
    var file_url = imgDir;//默认上传地址为图片
    /*其他上传格式的地址*/
    if (ActionType === 'uploadfile') {
      file_url = '/file/'; //附件保存地址
    }
    if (ActionType === 'uploadvideo') {
      file_url = '/video/'; //视频保存地址
    }
    res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    res.setHeader('Content-Type', 'text/html');
  }
  //客户端发起图片列表请求
  else if (ActionType === 'listimage'){

    res.ue_list(imgDir);  // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/static/ueditor/nodejs/config.json')
  }})
)

app.get('/', function (req, res, next) {

  // 检查 session 中的 isVisit 字段
  // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
  console.log(req.session)
  if(req.session.isVisit) {
    req.session.isVisit++;
    res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
  } else {
    req.session.isVisit = 1;
    res.send("欢迎第一次来这里");
    console.log(req.session);
  }
  next()
});
app.get('/img/*', (req, res) => {
  let pathname = url.parse(req.url).pathname
  let filepath = path.join(__dirname, pathname)
  fs.readFile(filepath, function (err, file) {
    if (err) {
      res.writeHead(404)
      console.log('response file error: ' + filepath)
      res.end('404 NOT FOUND...')
      return
    }
    if (filepath.slice(filepath.lastIndexOf('.') - filepath.length) === '.css') {
      res.writeHead('200', {'Content-type': 'text/css'})
    } else {
      res.writeHead('200')
    }
    res.end(file)
  })
})
app.listen(2222);

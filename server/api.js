/**
 * Created by Vamgoon on 2017/5/4.
 */
const express = require('express')
const mysql = require('mysql')
const path = require('path')
const fs = require('fs')
const url = require('url')
const formidable = require('formidable')
const router = express.Router()
const uploadfoldername = 'upload'
const uploadfolderpath = path.join(__dirname, uploadfoldername)
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'blog'
})
const server = 'localhost'
const port = 2222

router.get('/', (req, res) => {
  res.send('testok')
})
router.get('/getArticles', (req, res) => {
  let errMsg
  pool.getConnection((err, connection) => {
    if (err) {
      errMsg = err
    } else {
      connection.query('select * from articles', (err, result) => {
        if (err) {
          errMsg = err
        } else {
          res.send(JSON.stringify(result))
        }
      })
    }
    connection.release()
  })
  if (errMsg) {
    console.log(errMsg)
    res.send(errMsg)
  }
})
router.get('/getArticle', (req, res) => {
  let errMsg
  pool.getConnection((err, connection) => {
    if (err) {
      errMsg = err
    } else {
      connection.query('select * from articles where id=?', [req.query.id], (err, result) => {
        if (err) {
          errMsg = err
        } else {
          res.send(JSON.stringify(result))
        }
      })
    }
    connection.release()
  })
  if (errMsg) {
    console.log(errMsg)
    res.send(errMsg)
  }
})
router.post('/ueditor', (req, res) => {
  let form = new formidable.IncomingForm()

  // 处理 request
  form.parse(req, function (err, fields, files) {
    if (err) {
      return console.log('formidable, form.parse err')
    }

    let item

    // 计算 files 长度
    let length = 0
    for (item in files) {
      length++
    }
    if (length === 0) {
      console.log('files no data')
      return
    }

    for (item in files) {
      let file = files[item]
      // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的目录
      let tempfilepath = file.path
      // 获取文件类型
      let type = file.type

      // 获取文件名，并根据文件名获取扩展名
      let filename = file.name
      let extname = filename.lastIndexOf('.') >= 0
        ? filename.slice(filename.lastIndexOf('.') - filename.length)
        : ''
      // 文件名没有扩展名时候，则从文件类型中取扩展名
      if (extname === '' && type.indexOf('/') >= 0) {
        extname = '.' + type.split('/')[1]
      }
      // 将文件名重新赋值为一个随机数（避免文件重名）
      filename = Math.random().toString().slice(2) + extname

      // 构建将要存储的文件的路径
      let filenewpath = path.join(uploadfolderpath, filename)

      // 将临时文件保存为正式的文件
      fs.rename(tempfilepath, filenewpath, function (err) {
        // 存储结果
        let result = ''

        if (err) {
          // 发生错误
          console.log('fs.rename err')
          result = 'error|save error'
        } else {
          // 保存成功
          console.log('fs.rename done')
          // 拼接图片url地址
          result = 'http://' + server + ':' + port + '/' + uploadfoldername + '/' + filename
        }

        // 返回结果
        res.send(result)
      }) // fs.rename
    } // for in
  })
})
router.post('/setArticle', (req, res) => {
  console.log(req.body)
  pool.getConnection((err, connection) => {
    if (err) {
      res.send({ bool: false, msg: err })
    } else {
      connection.query('select * from articles where title = ?', [req.body.title], (err, result) => {
        if (err) {
          res.send({ bool: false, msg: err })
        }
        if (result.length === 0) {
          connection.query('INSERT INTO articles SET ?', req.body, (err, result) => {
            if (err) {
              console.log(err)
              res.send({ bool: false, msg: err })
            } else {
              res.send({ bool: true, msg: '保存成功！' })
            }
          })
        } else {
          connection.query('UPDATE articles SET ? where title = ?', [req.body, req.body.title], (err, result) => {
            if (err) {
              console.log({ bool: false, msg: err })
              res.send(err)
            } else {
              res.send({ bool: true, msg: '更新成功！' })
            }
          })
        }
      })
    }
    connection.release()
  })
})
router.post('/deleteArticle', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.send({ bool: false, msg: err })
    } else {
      connection.query('select * from articles where id = ? AND title = ?', [req.body.id, req.body.title], (err, result) => {
        if (err) {
          res.send({ bool: false, msg: '与数据库连接出错！' })
        }
        if (result.length === 0) {
          res.send({ bool: true, msg: '删除失败，没有这边文章！' })
        } else {
          connection.query('delete from articles where id = ? AND title = ?', [req.body.id, req.body.title], (err, result) => {
            if (err) {
              console.log({ bool: false, msg: err })
              res.send({ bool: false, msg: err })
            } else {
              console.log('delete ok')
              res.send({ bool: true, msg: '删除成功！' })
            }
          })
        }
      })
    }
    connection.release()
  })
})
router.get('/ueditor/*', (req, res) => {
  console.log(333)
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
router.get('/img/*', (req, res) => {
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

module.exports = router

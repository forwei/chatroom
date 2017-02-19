import Router from 'koa-router'
import fs from 'fs'

import request from 'request'

const router = new Router()

router.get('/', async (ctx, next) => {
	ctx.body = '<!doctype html><html><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="ie=edge"/><title>Hello ChatRoom</title><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" type="text/css" href="/assets/main.css"></head><body><div id="app"></div><script src="/assets/app.js"></script></body></html>'
})

//聊天室发送消息
router.post('/api/message', async (ctx, next) => {
  //发消息权限检查
  if(!ctx.request.body.content || !ctx.request.body.time || !ctx.request.body.msgType){
    return ctx.throw(403)
  }
  let message = {}
  message.msgId = 1
  message.status = 1
  message.name = ctx.auth.name
  message.userId = ctx.auth.userId
  message.userLevel = ctx.auth.userLevel
  message.userFace = ctx.auth.userFace
  message.content = ctx.request.body.content
  message.msgType = ctx.request.body.msgType
  message.time = ctx.request.body.time
	ctx.app.chat.sendMessage('USER_MESSAGE', message)
	ctx.body = 'ok'
})

//获取所有在线用户信息
router.get('/api/allusers', async (ctx, next) => {
  ctx.body = await ctx.app.chat.allOnlineUser()
})

//获取账户信息
router.get('/api/account', async (ctx, next) => {
  ctx.body = ctx.auth
})

//代理获取sina表情库
router.get('/api/emotions', async (ctx, next) => {
  try{
    let json = await new Promise((resolve, reject) => {
      request.get('http://api.weibo.com/2/emotions.json?source=1362404091', (err, res, body) => {
        if (err) {
          return reject(err)
        }
        resolve(body)
      })
    })
    ctx.response.type = 'application/json'
    ctx.set('Cache-Control', 'max-age=31536000')
    ctx.body = json
  }catch(e){
    console.log('sina error')
  }
})

//上传图片文件
router.post('/upload', async (ctx, next) => {
  let reqBody = ctx.request.body
  let retData = {error: 1, msg: '上传失败'}
  ctx.response.type = 'application/json'
  ctx.body = retData

  if(!reqBody.files || reqBody.files.length == 0)
    return

  await new Promise((resolve, reject) => {
    let req = request.post('https://sm.ms/api/upload', (err, res, body) => {
      body = JSON.parse(body)
      //删除原文件
      fs.unlink(reqBody.files.file.path)
      if (err) {
        return reject(err)
      }
      if(body.code != 'success')
        return resolve()
      retData.error = 0
      retData.msg = '上传成功'
      retData.data = {
        height: body.data.height,
        width: body.data.width,
        size: body.data.size,
        url: body.data.url
      }
      resolve()
    })
    let reqForm = req.form()
    reqForm.append('smfile', fs.createReadStream(reqBody.files.file.path))
    reqForm.append('ssl', "true")
  })
})


export default router











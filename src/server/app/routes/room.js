import Router from 'koa-router'
import http from 'http'

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
      http.get('http://api.weibo.com/2/emotions.json?source=1362404091', (res) => {
        let html = ""
        res.on("data",(data)=>{
          html+=data
        })
        res.on("end",()=>{
          resolve(html)
        })
      })
    })
    ctx.response.type = 'application/json'
    ctx.set('Cache-Control', 'max-age=31536000')
    ctx.body = json
  }catch(e){
    console.log('sina error')
  }
})


export default router
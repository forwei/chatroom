import Router from 'koa-router'

const router = new Router()


router.get('/', async (ctx, next) => {
	ctx.body = '<!doctype html><html><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="ie=edge"/><title>Hello ChatRoom</title><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" type="text/css" href="/assets/main.css"></head><body><div id="app"></div><script src="/assets/app.js"></script></body></html>'
})

//聊天室发送消息
router.get('/api/message', async (ctx, next) => {
	ctx.app.chat.sendMessage('MESSAGE', {content: 'okle', type: 1})
	ctx.body = 'msg'
})

//获取所有在线用户信息
router.get('/api/allusers', async (ctx, next) => {
  ctx.body = await ctx.app.chat.allOnlineUser()
})


export default router
import {db, Session} from '../modules'
import uid from 'uid-safe'


const key = 'sid'
const cookie = {
  httpOnly: true,
  path: '/',
  overwrite: true,
  signed: false,
  maxAge: 0
}
let genSid = uid.sync
let sessionIdStore = {
  get: (ctx) => {
    return ctx.cookies.get(key, cookie)
  },
  set: (ctx, sid) => {
    ctx.cookies.set(key, sid, cookie)
  },
  reset: (ctx) => {
    ctx.cookies.set(key, null)
  }
}

export default () => {
	return async (ctx, next) => {
    if (ctx.session) {
      return await next
    }

    if (!ctx.sessionId) {
      ctx.sessionId = sessionIdStore.get(ctx)
    }

    let isNew = false, session
    if (!ctx.sessionId) {
      //生成的字符串有32个字节长
      ctx.sessionId = genSid.call(ctx, 24)
      isNew = true
    }
    session = new Session(ctx.sessionId)
    if(!isNew){
      ctx.session = await session.getSession()
    }else{
      ctx.session = {}
    }

    let firstError = null

    try{
		  await next()
    }catch (err) {
      firstError = err
      ctx.app.emit('error', err, ctx)
    }

    try {
      if(isNew)
        sessionIdStore.set(ctx, ctx.sessionId)
      await session.updateSession(ctx.session)
    }catch (err) {
      firstError = firstError || err
    }

    if (firstError) throw firstError
	}
}
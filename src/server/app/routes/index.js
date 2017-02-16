import Router from 'koa-router'

import api from './api'
import room from './room'
import {db} from '../modules'
import {session, auth} from '../middlewares'

const router = new Router()


router.use('/api', api.routes(), api.allowedMethods())

router.use('/room', session(), auth(), room.routes())

router.get('/info', session(), auth(), async (ctx, next) => {
  ctx.body = ctx.session
})

router.get('/infos', async (ctx, next) => {

  ctx.body = 'okless'
})

//注册
router.post('/signup', session(), auth(), async(ctx, next) => {
  let reqBody = ctx.request.body
  reqBody.qq = reqBody.qq ? reqBody.qq : ''
  let retData = {error: 0, msg: '注册成功'}
  ctx.body = retData

  if(!reqBody.userName || reqBody.userName.length < 2) {
    retData.error = 1
    retData.msg = '用户名设置错误'
    return
  }
  if(!reqBody.password || reqBody.password.length < 5) {
    retData.error = 1
    retData.msg = '密码设置错误'
    return
  }
  if(!reqBody.phone || reqBody.phone.length != 11 || !/^1[3|4|5|7|8][0-9]{9}$/.test(reqBody.phone)){
    retData.error = 1
    retData.msg = '手机号码设置错误'
    return
  }
  if(reqBody.qq.length > 0 && (reqBody.qq.length < 5 || !/^\d+$/.test(reqBody.qq))) {
    retData.error = 1
    retData.msg = 'QQ号码错误'
    return
  }

  let user = await db.query('SELECT * FROM `user` WHERE `name` = ? OR `phone` = ?', [reqBody.userName, reqBody.phone])
  if(user.length > 0) {
    retData.error = 1
    if(user.name = reqBody.userName)
      retData.msg = '用户名已存在'
    else
      retData.msg = '手机号码已注册'
    return
  }
  
  user = await db.execute('INSERT INTO `user`(`name`, `phone`, `qq`) VALUES (?,?,?)', [reqBody.userName, reqBody.phone, reqBody.qq])
  if(!user.insertId || user.insertId < 1) {
    retData.error = 1
    retData.msg = '服务器错误'
    return
  }

  await db.execute('INSERT INTO `userAuth`(`userId`, `type`, `identifier`, `passwordHash`) VALUES (?,?,?,?)', [user.insertId, 'userName', reqBody.userName, reqBody.password])
  await db.execute('INSERT INTO `userAuth`(`userId`, `type`, `identifier`, `passwordHash`) VALUES (?,?,?,?)', [user.insertId, 'phone', reqBody.phone, reqBody.password])
})

//登录
router.post('/signin', session(), auth(), async(ctx, next) => {
  let reqBody = ctx.request.body
  let retData = {error: 0, msg: '注册成功'}
  ctx.body = retData

  if(!reqBody.userName || reqBody.userName.length < 5) {
    retData.error = 1
    retData.msg = '用户名错误'
    return
  }
  if(!reqBody.password || reqBody.password.length < 5) {
    retData.error = 1
    retData.msg = '密码错误'
    return
  }

})

export default router

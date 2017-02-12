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


export default router

import Router from 'koa-router'

import {db} from '../modules'

const router = new Router()

router.get('/info', async (ctx, next) => {
	await next()

	ctx.body = 'ok'
})


export default router
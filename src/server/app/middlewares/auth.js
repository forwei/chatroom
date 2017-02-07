
import {db} from '../modules'

const cookie = {
  httpOnly: false,
  path: '/',
  overwrite: true,
  signed: false,
  maxAge: 2147483647000
}

export default () => {
	return async (ctx, next) => {
		if(!ctx.session || !ctx.sessionId){
			console.log('auth middleware need session')
			return
		}
		if(ctx.auth){
			return await next()
		}

		if(ctx.session.auth && ctx.session.auth.userId && !ctx.session.auth.isGuest){
			//login user
		}else{
			//guest user
			let guestName = ctx.cookies.get('guestName', cookie)
			if(!guestName){
				guestName = ctx.sessionId.substr(3, 4)
				ctx.cookies.set('guestName', guestName, cookie)
			}
			let time = Math.round(new Date().getTime()/1000),
				auth = {}, row = []
			if(ctx.session.auth)
				row = await db.query('SELECT * FROM `guestUser` WHERE `id` = ?', [ctx.session.auth.userId])
			else
				row = await db.query('SELECT * FROM `guestUser` WHERE `name` = ?', [guestName])
			if(row.length > 0){
				if(!ctx.session.auth)
					db.execute('UPDATE `guestUser` SET `loginTime`=? WHERE `id` = ?', [time, row[0].id])
				auth = {...row[0]}
			}else{
				row = await db.execute('INSERT INTO `guestUser`( `name`, `loginTime`, `createTime`) VALUES (?,?,?)', [guestName, time, time])
				auth.id = row.insertId
				auth.loginTime = auth.createTime = time
			}

			auth.userLevel = 0
			auth.userFace = ''
			auth.userId = -auth.id

			ctx.auth = auth
			ctx.session.auth = {userId: auth.id, isGuest: true}
		}

		await next()
	}
}
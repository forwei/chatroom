import {db} from '.'

export default class Auth {
	constructor(user) {
		this.userId = user.userId
		this.isGuest = user.isGuest ? true : false
		this.userInfo = null
	}

	async getUserInfo() {
		if(this.userInfo)
			return this.userInfo

		if(this.isGuest){
			let row = await db.query('SELECT * FROM `guestUser` WHERE `id` = ?', [this.userId])
			if(row.length < 1)
				return null
			row = row[0]
			row.userId = this.userId
			row.userLevel = 0
			row.userFace = ''
			row.isGuest = true

			this.userInfo = row
		}else {
			let row = await db.query('SELECT * FROM `user` WHERE `id` = ?', [this.userId])
			if(row.length < 1)
				return null
			row = row[0]
			row.userId = this.userId
			row.userLevel = 1
			row.userFace = ''
			row.isGuest = false

			this.userInfo = row
		}
		return this.userInfo
	}
}
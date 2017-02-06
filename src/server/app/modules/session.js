import {db} from '.'
import {crc32} from 'crc'

export default class Session {

	constructor(sid){
		this.sid = sid
		this.session = {}
	}

	async getSession() {
		try{
			let session = await db.query('SELECT * FROM `session` WHERE `sid` = ?', [this.sid])
	    if(session && session[0] && session[0].data){
	      this.session = JSON.parse(session[0].data)
	    }
		} catch(err) {
			console.log('session error')
		}

		return {...this.session}
	}

	async updateSession(sess) {
		let data = this.hash(this.session)
		if(data == this.hash(sess))
			return

		data = JSON.stringify(sess)
    let time = Math.round(new Date().getTime() / 1000)
    await db.execute('INSERT INTO session(sid, time, data) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE time=?, data =?', [this.sid, time, data, time, data])
	}

	hash(sess) {
  	return crc32.signed(JSON.stringify(sess))
	}
}
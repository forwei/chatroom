import mysql from 'mysql2/promise'


let instances = null

class db {

	constructor() {
		
		this.pool = mysql.createPool({
			host: '47.90.79.29',
			user: 'chatroom',
			password: 'EjASvqxmwQ7Xm7wH',
			database: 'chatroom'
		})
	}

	async query() {
		let [rows] = await this.pool.query(...arguments)
		return rows
	}

	async execute() {
		let [rows] = await this.pool.execute(...arguments)
		return rows
	}
}

export default instances ? instances : instances = new db()
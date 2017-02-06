import socket from 'socket.io'

import {Session, Auth} from '.'

class Chat {

	constructor(http) {
		this.io = socket(http)
		this.initListen()
	}

	initListen() {
		this.io.on('connection', async (client) => {
			console.log('connection')
			if(this.isLogin(client)){
				client.disconnect()
				console.log('reconnection')
				return
			}

			//通知所有在线用户，新用户上线
			let userInfo = await client.auth.getUserInfo()
			this.sendMessage('USER_CONNECTION', userInfo)
			//end

			client.on('disconnect', () => {
				console.log('disconnect')
				this.sendMessage('USER_DISCONNECT', userInfo)
			})

			client.on('message', (data, fn) => {
				console.log(data)
				fn('client.auth.getUserInfo()')
			})
		})

		this.io.use(async (client, next) => {
			let sessionId = client.request.headers.cookie
			let startFlag = sessionId ? sessionId.indexOf('sid=') : -1
			if(startFlag < 0){
				client.disconnect()
				console.log('not session id cookie: ' + client.request.headers.cookie)
				return
			}
			let endFlag = sessionId.indexOf(';', startFlag)
			sessionId = sessionId.substring(startFlag + 4, endFlag < startFlag ? sessionId.length : endFlag)

			client.sessionId = sessionId
			let session = new Session(client.sessionId)
			session = await session.getSession()

			if(!session.auth){
				client.disconnect()
				console.log(session.auth)
				return
			}

			client.auth = new Auth(session.auth)

			next()
		})
	}

	sendMessage(msgType, msg) {
		this.io.send({msgType: msgType, data: msg})
	}

	async allOnlineUser() {
		let users = []
		for(let inx in this.io.sockets.connected){
			users.push(await this.io.sockets.connected[inx].auth.getUserInfo())
		}
		return users
	}

	isLogin(client) {
		for(let inx in this.io.sockets.connected){
			if(client.id != inx && client.sessionId == this.io.sockets.connected[inx].sessionId)
				return true
		}
		return false
	}
}

export default Chat
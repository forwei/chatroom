import io from 'socket.io-client'

import Promise from 'promise-polyfill'
if (!window.Promise) {
  window.Promise = Promise
}

import store from '../reducers/store'
import {userConnection, userDisconnect, userAllConnection} from '../actions/user'

let socket = io()

socket.on('message', data => {
  switch(data.msgType) {
    case 'USER_CONNECTION':
      store.dispatch(userConnection(data.data))
    break
    case 'USER_DISCONNECT':
      store.dispatch(userDisconnect(data.data))
    break
  }
})



//初始化，获取所有在线用户
fetch('/room/api/allusers', {credentials: 'include'}).then(response => {
	return response.json()
}).then( data => {
	store.dispatch(userAllConnection(data))
}).catch(e => {
	console.log('allusers api error')
})
import io from 'socket.io-client'

import Promise from 'promise-polyfill'
if (!window.Promise) {
  window.Promise = Promise
}

import store from '../reducers/store'
import {userConnection, userDisconnect, userAllConnection} from '../actions/user'
import {getAccount} from '../actions/account'
import {userMessage} from '../actions/message'

let socket = io()

socket.on('message', data => {
  switch(data.msgType) {
    case 'USER_CONNECTION':
      store.dispatch(userConnection(data.data))
    break
    case 'USER_DISCONNECT':
      store.dispatch(userDisconnect(data.data))
    break
    case 'USER_MESSAGE':
      store.dispatch(userMessage(data.data))
    break
  }
})



//初始化，获取所有在线用户
fetch('/room/api/allusers', {credentials: 'include'}).then(res => {
	return res.json()
}).then( data => {
	store.dispatch(userAllConnection(data))
}).catch(e => {
	console.log('allusers api error')
})

//获取用户信息
fetch('/room/api/account', {credentials: 'include'}).then(res => {
  return res.json()
}).then( data => {
  store.dispatch(getAccount(data))
}).catch(e => {
  console.log('account api error')
})
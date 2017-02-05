import io from 'socket.io-client'

import store from '../reducers/store'
import {userConnection, userDisconnect} from '../actions/user'

let socket = io('47.90.79.29:3000')



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
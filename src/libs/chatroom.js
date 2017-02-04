import io from 'socket.io-client'

import userAction from '../actions/user'

let socket = io('47.90.79.29:3000')



socket.on('message', data => {
  switch(data.msgType) {
    case 'USER_CONNECTION':
      console.log(data.data)
    break
  }
})
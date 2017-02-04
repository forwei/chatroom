import {
  USER_CONNECTION,
  USER_DISCONNECT
} from './index'


export const userConnection = user => ({
  type: USER_CONNECTION,
  user: user
})

export const userDisconnect = user => ({
  type: USER_DISCONNECT,
  user: user
})
import {
  USER_CONNECTION,
  USER_DISCONNECT,
  USER_ALL_CONNECTION
} from './index'


export const userConnection = user => ({
  type: USER_CONNECTION,
  user: user
})

export const userDisconnect = user => ({
  type: USER_DISCONNECT,
  user: user
})

export const userAllConnection = users => ({
	type: USER_ALL_CONNECTION,
	users: users
})
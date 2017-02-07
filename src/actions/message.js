import {
  POST_MESSAGE,
  USER_MESSAGE
} from './index'


export const postMessage = msg => ({
  type: POST_MESSAGE,
  msg: msg
})

export const userMessage = msg => ({
  type: USER_MESSAGE,
  msg: msg
})
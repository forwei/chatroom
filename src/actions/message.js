import {
  POST_MESSAGE
} from './index'


export const postMessage = msg => ({
  type: POST_MESSAGE,
  msg: msg
})
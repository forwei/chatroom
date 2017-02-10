import {
  POST_MESSAGE,
  USER_MESSAGE
} from '../actions'

import store from './store'
import emotion from '../utils/emotion'

//message {name: '', content: '', msgType: 1, time: 12456584, userId: 1000, msgId: 1001, userLevel: 0, userFace: '', status: 0}
const Message = (state = [], action) => {
  switch (action.type) {
    case POST_MESSAGE:
      return postMessage(state, action.msg)
    case USER_MESSAGE:
      return addMessage(state, action.msg)
    default:
      return state
  }
}

function addMessage(state, msg) {

  const account = store.getState().account

  if(msg.userId == account.userId) {
    for(let inx in state) {
      if(state[inx].msgId < 1 && state[inx].status == 0 && state[inx].time == msg.time) {
        state[inx].msgId = msg.msgId
        state[inx].status = 1

        return [...state]
      }
    }
  }

  msg.content = emotion.analyticEmotion(msg.content)

  return [...state, msg]
}

function postMessage(state, msg) {
  const account = store.getState().account

  let postMsg = {}
  postMsg.content = msg.content
  postMsg.msgType = msg.msgType
  postMsg.time = Math.round(new Date().getTime() / 1000)

  fetch('/room/api/message', {
    credentials: 'include',
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postMsg)
  }).catch(e => {
    console.log('post message error')
  })

  postMsg.name = account.name
  postMsg.userId = account.userId
  postMsg.userLevel = account.userLevel
  postMsg.userFace = account.userFace
  postMsg.status = 0
  postMsg.msgId = 0

  //替换face
  postMsg.content = emotion.analyticEmotion(msg.content)

  return [...state, postMsg]
}

export default Message
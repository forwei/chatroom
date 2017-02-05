import {
  USER_CONNECTION,
  USER_DISCONNECT
} from '../actions'


const User = (state = [], action) => {
  switch (action.type) {
    case USER_CONNECTION:
      return addUser(state, action.user)
    case USER_DISCONNECT:
      return delUser(state, action.user)
    default:
      return state
  }
}

function addUser(state, user) {
  if(findUser(state, user) > -1){
    return state
  }
  return [...state, user]
}

function delUser(state, user) {
  let inx = findUser(state, user)
  if(inx > -1){
    state.splice(inx, 1)
  }
  return [...state]
}

function findUser(state, user) {
  for(let inx in state){
    if(state[inx].userId == user.userId)
      return inx
  }
  return -1
}

export default User
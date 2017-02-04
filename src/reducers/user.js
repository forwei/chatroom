import {
  USER_CONNECTION,
  USER_DISCONNECT
} from '../actions'


const User = (state = {}, action) => {
  switch (action.type) {
    case USER_CONNECTION:
      return {}
    case USER_DISCONNECT:
      return {}
    default:
      return state
  }
}

export default User
import {
  POST_MESSAGE
} from '../actions'


const Message = (state = [], action) => {
  switch (action.type) {
    case POST_MESSAGE:
      return []
    default:
      return state
  }
  
}

export default Message
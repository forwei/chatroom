import {
  BACKGROUND_CHANGE
} from '../actions'


const backgroundChange = (state = 'assets/img/bg-img0.jpg', action) => {
  switch (action.type) {
    case BACKGROUND_CHANGE:
      return action.url
    default:
      return state
  }
}

export default backgroundChange
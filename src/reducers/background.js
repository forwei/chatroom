import {
  BACKGROUND_CHANGE
} from '../actions'

let backgroundImg = '/assets/img/bg-limg0.jpg'
if(localStorage && localStorage.hasOwnProperty('backgroundImg')){
  backgroundImg = localStorage.getItem('backgroundImg')
}

const Background = (state = backgroundImg, action) => {
  switch (action.type) {
    case BACKGROUND_CHANGE:
      return action.url
    default:
      return state
  }
}

export default Background
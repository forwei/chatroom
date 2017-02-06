import { combineReducers } from 'redux'
import background from './background'
import user from './user'
import message from './message'



const rootReducer = combineReducers({
  background,
  user,
  message
})

export default rootReducer
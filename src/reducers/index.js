import { combineReducers } from 'redux'
import background from './background'
import user from './user'
import message from './message'
import account from './account'



const rootReducer = combineReducers({
  background,
  user,
  message,
  account
})

export default rootReducer
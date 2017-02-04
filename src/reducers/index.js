import { combineReducers } from 'redux'
import background from './background'
import user from './user'



const rootReducer = combineReducers({
  background,
  user
})

export default rootReducer
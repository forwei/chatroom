import {
  GET_ACCOUNT
} from '../actions'

//account = {name: '', userId: 1000, userFace: '', userLevel: 0}
const Account = (state = {}, action) => {
  switch (action.type) {
    case GET_ACCOUNT:
      return action.account
    default:
      return state
  }
}

export default Account
import {
  GET_ACCOUNT
} from './index'


export const getAccount = account => ({
  type: GET_ACCOUNT,
  account: account
})
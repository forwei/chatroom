import {
  BACKGROUND_CHANGE
} from './index'


export const changeBackground = bgUrl => ({
  type: BACKGROUND_CHANGE,
  url: bgUrl
})
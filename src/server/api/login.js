import {get, post} from '../index'
const login = (params) => {
  return post('login', params)
}
export default {
  login
}
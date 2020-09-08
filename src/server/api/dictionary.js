import {get} from '../index'
// 获取字典表
const getDic = (params) => {
  return get('', params)
}
export default {
  getDic
}
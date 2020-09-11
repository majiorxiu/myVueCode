import common from './common'
// 封装后 注册成全局方法
export default {
  install (Vue, options) {
    Vue.prototype.$common = common
  }
}
import grid from './grid-fun'
import common from './common'
export default {
  install (Vue, options) {
    Vue.prototype.$gridFun= grid
    Vue.prototype.$common = common
  }
}
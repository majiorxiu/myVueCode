import {getDic} from '@ser/dictionary'
// 字典表请求 指令
export default {
  data () {
    return {
      dicList: []
    }
  },
  directives: {
    dic: {
      bind (el, binding, vnode) {
        getDic(binding.expression).then((result)=> {
          this.dicList = result
        })
      }
    }
  }
}
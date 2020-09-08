
import Vue from 'vue'
import App from './App'
import router from './router/permission'
import ElementUI from 'element-ui'
import store from './store'
import plugin from './plugin/index'
import consts from '@js/global/const-key'
// 全局样式
import 'element-ui/lib/theme-chalk/index.css'

import '@css/reset.css'
import '@css/components-reset.css'
import '@css/global.scss'

import bus from '@js/eventBus'

Vue.use(ElementUI, {size: 'small'})
Vue.use(plugin)
Vue.prototype.consts = consts
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// 本站禁用 F1-F12 快捷键, 因要注册为其他功能使用
document.addEventListener('keydown', () => {
  if([112,113,114,115,116,117,118,119,120,121,122,123].indexOf(window.event.keyCode) >= 0) {
    console.log('按下功能键')
    return window.event.returnValue = false;
  }
  if(window.event.keyCode === 13) {
    bus.$emit('search')
  }
})
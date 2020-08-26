// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/permission'
import ElementUI from 'element-ui'
import axios from './server'
import store from './store'
import plugin from './plugin/index'
// 全局样式
import 'element-ui/lib/theme-chalk/index.css'
import '@css/reset.css'
import '@css/common.css'
import '@css/components-reset.css'

axios.install(Vue)
Vue.use(ElementUI)
Vue.use(plugin)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

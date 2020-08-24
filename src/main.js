// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/permission'
import ElementUI from 'element-ui'
import axios from './server'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

import plugin from './plugin/index'
import '@/assets/css/reset.css'
import '@/assets/css/common.css'

axios.install(Vue)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(plugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

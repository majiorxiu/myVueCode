import Vue from 'vue'
import Router from 'vue-router'
import element from './element'
import echart from './echart'
import domain from './domain'
const home = () => import('@/page/index')
const error404 = () => import('@/page/errorPage/404')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: "*",
      name: '404',
      component: error404,
    },
    {
      path: '/',
      name: '首页',
      component: home,
    },
    ...element,
    ...echart,
    ...domain,
  ]
})

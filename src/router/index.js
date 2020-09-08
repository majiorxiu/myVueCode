import Vue from 'vue'
import Router from 'vue-router'
import warehouse from './warehouse'
const home = () => import('@/page/index')
const error404 = () => import('@/page/errorPage/404')
const childView = () => import('@page/layout/childView')

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
      component: childView,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: '首页',
          component: home,
        },
      ]
    },
    ...warehouse
  ]
})
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

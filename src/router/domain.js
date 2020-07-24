const childView = () => import('@/page/layout/childView')
const index = () => import('@/page/domain/index')

let domain = [
    {
      path: '/domain',
      name: 'domain',
      component: childView,
      redirect: '/domain/index',
      children: [
        {
          path: 'index',
          name: '跨域',
          component: index,
        },
      ]
    }
  ]
export default domain
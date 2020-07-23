const childView = () => import('@/page/layout/childView')
const grid = () => import('@/page/element/index')

let element = [
    {
      path: '/element',
      name: 'element-ui',
      component: childView,
      redirect: '/element/grid',
      children: [
        {
          path: 'grid',
          name: '表格',
          component: grid,
        }
      ]
    }
  ]
export default element
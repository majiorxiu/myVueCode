const childView = () => import('@/page/layout/childView')
const index = () => import('@/page/echart/index')

let echart = [
    {
      path: '/echart',
      name: 'echart',
      component: childView,
      redirect: '/echart/index',
      children: [
        {
          path: 'index',
          name: '柱状图',
          component: index,
        },
      ]
    }
  ]
export default echart
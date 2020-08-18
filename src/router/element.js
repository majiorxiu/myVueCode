const childView = () => import('@/page/layout/childView')
const grid = () => import('@/page/element/grid/index')
const filterAssembly = () => import('@/page/element/filter-assembly/index')

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
        },
        {
          path: 'filter-assembly',
          name: '筛选条件组件',
          component: filterAssembly,
        }
      ]
    }
  ]
export default element
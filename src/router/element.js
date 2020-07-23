const childView = () => import('@/page/layout/childView')
const grid = () => import('@/page/element/grid/index')
// const form = () => import('@/page/element/form/index')

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
        // {
        //   path: 'form',
        //   name: '表单',
        //   component: form,
        // }
      ]
    }
  ]
export default element
const childView = () => import('@page/layout/childView')
const page1 = () => import('@views/warehouse/page1')
const page2 = () => import('@views/warehouse/page2')
// const page3 = () => import('@views/warehouse/page3.html')

let warehouse = [
    {
      path: '/warehouse',
      name: 'warehouse',
      component: childView,
      redirect: '/warehouse/page1',
      children: [
        {
          path: 'page1',
          name: 'page1',
          component: page1,
        },
        {
          path: 'page2',
          name: 'page2',
          component: page2,
          meta: {
            open: true
          }
        },
      ]
    }
  ]
export default warehouse
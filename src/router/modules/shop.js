// write your comment here...
export default [
  {
    path: '/shop',
    name: '新增',
    noDropdown: true,
    sort: 0,
    icon: "iconfont ",
    redirect: '/shop',
    component: () => import('@/views/frame/Frame'),
    children: [
      {
        path: '',
        component: () => import('@/views/shop/add')
      }
    ]
  }
]

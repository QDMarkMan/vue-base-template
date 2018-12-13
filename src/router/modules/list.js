// write your comment here...
export default [
  {
    path: '/list',
    name: '表格',
    noDropdown: true,
    sort: 0,
    icon: "iconfont ",
    redirect: '/list',
    component: () => import('@/views/frame/Frame'),
    children: [
      {
        path: '',
        component: () => import('@/views/list/index')
      }
    ]
  }
]

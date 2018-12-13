// 需要置顶  可以这么写 也可以排序
export default [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    noDropdown: true,
    component: () => import('@/views/frame/Frame'),
    children: [
      {
        path: '',
        component: () => import('@/views/index/index')
      }
    ]
  }
]

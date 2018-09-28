export default [
  {
    path: '/richtext',
    noDropdown: true, // 是否有下级菜单
    name: 'Richtext',
    hidden: false, // 是否隐藏
    icon: '', // 图标
    redirect: "/richtext", // 如果要默认路由携带名称的话,就需要redirect
    component: () => import('@/views/frame/Frame'),
    children: [
      {
        path: '',
        component: () => import('@/views/richtext/ReachText')
      }
    ]
  }
]

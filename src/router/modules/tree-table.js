export default [
  {
    path: '/treeTable',
    noDropdown: true, // 是否有下级菜单
    name: 'treeTable',
    hidden: false, // 是否隐藏
    icon: '', // 图标
    redirect: "/treeTable", // 如果要默认路由携带名称的话,就需要redirect
    component: () => import('@/views/frame/Frame'),
    children: [
      {
        path: '',
        component: () => import('@/views/tree-table/Index')
      }
    ]
  }
]

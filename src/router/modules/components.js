export default [
  {
    path: '/components',
    name: '组件示例',
    component: () => import('@/views/frame/Frame'),
    noDropdown: false,
    icon: '',
    hidden: true, // 是否隐藏
    children: [

    ]
  }
]

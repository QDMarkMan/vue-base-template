export default [
    {
      path: '/login',
      name: 'login',
      noDropdown: true,// 是否有下级菜单
      hidden: true,// 是否隐藏
      icon: '',// 图标
      component: () => import('@/views/login/Login')
    }
]
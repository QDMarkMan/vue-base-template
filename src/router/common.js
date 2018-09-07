export default [
  {
    path: '/',
    name: 'index',
    redirect: '/index',
    component: () => import('@/views/frame/Frame'),
    children: [
      {
        path: '',
        component: () => import('@/views/index/index'),
      }
    ]
  },
  {
    path: '/welcome',
    name: 'welcome',
    redirect: '/welcome',
    hidden: true,
    component: () => import('@/views/frame/FrameNoSide'),
    children: [
      {
        path: '',
        component: () => import('@/views/welcome/Welcome')
      }
    ]
  }
]
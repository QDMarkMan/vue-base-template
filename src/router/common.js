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
    component: () => import('@/views/frame/FrameNoSide'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('@/views/welcome/Welcome')
      }
    ]
  }
]
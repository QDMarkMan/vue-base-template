export default [
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
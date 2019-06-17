/*
 * @Author: Etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-06-17 15:13:21
 * @Description: 测试aaa目录中生成bbb模块
 */
export default [
  {
    path: "/aaa",
    component: () => import("@/views/frame/Frame"),
    redirect: "/aaa/bbb",
    name: "aaa",
    icon: "",
    noDropdown: false,
    children: [
      {
        path: "/aaa/bbb",
        component: () => import("@/views/aaa/bbb/index"),
        name: "bbb",
        meta: {
          keepAlive: false
        }
      }
    ]
  }
]
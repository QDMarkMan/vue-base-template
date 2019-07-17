/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version:
 * @Date: 2019-02-21 17:19:05
 * @LastEditors: etongfu
 * @LastEditTime: 2019-07-17 09:39:46
 * @Description: 通用路由 404/403
 * @youWant: add you want info here
 */
export default [
  // 无权限访问
  {
    path: "/nopermission",
    name: "nopermission",
    hidden: true, //
    component: () => import("@/views/error/403")
  },
  // 404页面
  {
    path: "*",
    name: "lost",
    hidden: true, // 是否隐藏
    component: () => import("@/views/error/404")
  }
]

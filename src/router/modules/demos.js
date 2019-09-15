/*
 * @Author: etongfu
 * @Email: 13583254085
 * @Date: 2019-09-15 11:09:00
 * @Description: 各种demos模块
 */
export default [
  {
    path: "/demos",
    component: () => import("@/views/frame/Frame"),
    redirect: "/demos/gantt",
    name: "demos",
    icon: "",
    noDropdown: false,
    children: [
      {
        path: "/demos/gantt",
        component: () => import("@/views/demos/gantt/index"),
        name: "gantt",
        meta: {
          keepAlive: false
        }
      }
    ]
  }
]


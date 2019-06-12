/*
 * @Author: 
 * @Version: 
 * @Date: date
 * @Description: 
 * @youWant: add you want info here
 */

export default [
  {
    path: "/module",
    component: () => import("@/views/frame/Frame"),
    redirect: "/folder/module",
    name: "",
    icon: "",
    noDropdown: false,
    children: [
      {
        path: "$url",
        component: () => import("@/views/folder/module/index"),
        name: ""
      }
    ]
  }
]
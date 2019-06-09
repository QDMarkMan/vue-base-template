export default [
  {
    path: "/$module",
    component: () => import("@/views/frame/Frame"),
    redirect: "$url",
    name: "",
    icon: "",
    noDropdown: false,
    children: [
      {
        path: "$url",
        component: () => import("@/views/$compath/index"),
        name: ""
      }
    ]
  }
]
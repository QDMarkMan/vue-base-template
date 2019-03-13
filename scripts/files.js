/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 需要生成的文件字符串
 * @youWant: add you want info here
 * @Date: 2019-03-01 16:55:58
 * @LastEditTime: 2019-03-11 17:30:51
 */
// 构造Vue文件
module.exports.vueFile = module => (`<template>
  <box-content v-loading="loading">
    <page-title buttons="add">
      <div slot="title">
        <span class="iconfont"></span> ${module}
      </div>
    </page-title>
    <base-table :columns="headers" :list="list" @reset="resetCb" @edit="editCb" @delete="deleteCb">
        <!-- 选择自定义slot -->
        <template slot="roleSlot" slot-scope="{scope}">
            {{scope.row.roleName}}
        </template>
    </base-table>
  </box-content>
</template>

<script>
import listMixins from '@/mixins/list'
export default {
name: '${module}',
mixins: [listMixins],
data () {
  return {
    headers: [
      { type: 'selection' },
      { type: 'index' },
      { key: 'loginName', title: '登录名' },
      { key: 'userName', title: '用户名' },
      { key: 'roleName', title: '角色名称', hidden: true, slot: 'roleSlot' },
      { key: 'createDate', title: '创建时间' },
      // operate 这一行可以选择直接使用slot或者是使用配置项
      { type: 'operate',
        title: '操作',
        operates: [
          { name: '重置', emitKey: 'demo' },
          { name: '编辑', emitKey: 'demo' },
          { name: '删除', emitKey: 'demo' }
        ] }
    ]
  }
},
methods: {
  // 监听事件
  resetCb (data) {
    this.$message.success('data.loginName')
  },
  editCb (data) {
    this.$message.success('data.loginName}')
  },
  deleteCb (data) {
    this.$message.success('data.loginName')
  }
},
created() {  }
}
</script>

`)
/**
 * 构建Vue空白页面
 * @param {*} pageName 页面名称
 * @param {*} type  add/view/blank 默认是blank页面
 */
function vueBlankFile (pageName, type = 'blank') {
  return `
<template>
  <div class="content">
    <page-title back slot="buttonTitle" buttons="save">
      <div slot="title">
        <span class="iconfont"></span> module
      </div>
    </page-title>
    <box-content>
      ${type} ${pageName}
    </box-content>
  </div>
</template>

<script>
export default {
  name: "module-view",
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  }
};
</script>
`
}
// vue新增模块构造文件
module.exports.vueAddFile = module => (vueBlankFile(module, 'add'))
// vue查看构造文件
module.exports.viewFile = module => (vueBlankFile(module, 'view'))
/**
 * 构造routerfile
 */
module.exports.routerFile = (module, dir, isSimpleModule) => {
  // 简单模块直接使用dir作为路径
  let comPath = isSimpleModule ? `${dir}` : `${dir}/${module}`
  let urlPath = isSimpleModule ? `/${dir}` : `/${dir}/${module}`
  console.log(urlPath)
  console.log(comPath)
  // 默认当前模块为首要模块
  return (`// write your comment here...
export default [
  {
    path: "/${dir}",
    component: () => import("@/views/frame/Frame"),
    redirect: "${urlPath}",
    name: "",
    icon: "",
    noDropdown: false,
    children: [
      {
        path: "${urlPath}",
        component: () => import("@/views/${comPath}/index"),
        name: ""
      }
    ]
  }
]

`)
}
// api 文件
module.exports.apiFile = module => (`// write your comment here...
import http from '@/utils/http'

export function demo (data) {
  return http({
    method: "post",
    url: '',
    data
  })
}
`)

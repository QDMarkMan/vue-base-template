/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 需要生成的文件字符串
 * @youWant: add you want info here
 * @Date: 2019-03-01 16:55:58
 * @LastEditTime: 2019-03-01 17:14:20
 */
// 构造Vue文件
module.exports.vueFile = module => (`<template>
<div class="content">
  <page-title slot="buttonTitle" buttons="add">
    <div slot="title">
      <span class="iconfont"></span> ${module}
    </div>
  </page-title>
  <box-content>
    <base-table v-loading="loading" :columns="headers" :list="list" @reset="resetCb" @edit="editCb" @delete="deleteCb">
        <!-- 选择自定义slot -->
        <template slot="roleSlot" slot-scope="{scope}">
            {{scope.row.roleName}}
        </template>
    </base-table>
  </box-content>
</div>
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
          { name: '重置', emitKey: 'reset' },
          { name: '编辑', emitKey: 'edit' },
          { name: '删除', emitKey: 'delete' }
        ] }
    ]
  }
},
methods: {
  // 监听事件
  resetCb (data) {
    this.$message.success(data.demo)
  },
  editCb (data) {
    this.$message.success(data.demo)
  },
  deleteCb (data) {
    this.$message.success(data.demo)
  }
},
created() {
  
}
}
</script>
`)
// vue新增模块构造文件
module.exports.vueAddFile = module => (`
  
`)
// vue查看构造文件
module.exports.viewFile = module => (`

`)
/**
 * 构造routerfile
 */
module.exports.routerFile = (module, dir, isSimpleModule) => {
  // 简单模块直接使用dir作为路径
  let comPath = isSimpleModule ? `${dir}` :`${dir}/${module}`
  return (`// write your comment here...
export default [
  {
    path: "/${dir}",
    component: () => import("@/views/frame/Frame"),
    redirect: "/${dir}",
    name: "",
    icon: "",
    noDropdown: false,
    children: [
      {
        path: "",
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

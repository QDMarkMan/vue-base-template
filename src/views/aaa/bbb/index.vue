<template>
  <box-content>
    <div class="search">
      aaa/bbb
    </div>
    <base-table
      v-loading="loading"
      :columns="headers"
      :list="list"
      @reset="resetCb"
      @edit="editCb"
      @delete="deleteCb"
    >
      <!-- 选择自定义slot -->
      <template slot="roleSlot" slot-scope="{ scope }">
        {{ scope.row.roleName }}
      </template>
    </base-table>
  </box-content>
</template>

<script>
/*
 * @Author: Etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-06-17 15:13:21
 * @Description: 测试aaa目录中生成bbb模块
 */
import listMixins from '@/mixins/list'
export default {
  name: 'bbb',
  mixins: [listMixins],
  data() {
    return {
      loading: false,
      type: '',
      headers: [
        { type: 'selection' },
        { type: 'index' },
        { key: 'aaa', title: 'xxxx' },
        { key: 'aaa', title: 'xxxx', hidden: true, slot: 'roleSlot' },
        { key: 'aaa', title: 'xxxxx' },
        // operate 这一行可以选择直接使用slot或者是使用配置项
        {
          type: 'operate',
          title: '操作',
          operates: [
            { name: '重置', emitKey: 'reset' },
            { name: '编辑', emitKey: 'edit' },
            { name: '删除', emitKey: 'delete' }
          ]
        }
      ]
    }
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        // 这个已经在mixins中声明了
        for (let index = 0; index < 14; index++) {
          this.list.push({
            loginName: `admin${index}`,
            userName: `user${index}`,
            roleName: `role${index}`,
            createDate: new Date().getTime(),
            id: index
          })
        }
      }, 2000)
    },
    // 监听事件
    resetCb(data) {
      this.$message.success(`reset  ${data.loginName}`)
    },
    editCb(data) {
      this.$message.success(`edit  ${data.loginName}`)
    },
    deleteCb(data) {
      this.$message.success(`delete  ${data.loginName}`)
    }
  },
  created() {
    this.load()
  }
}
</script>


<template>
  <box-content>
    <!-- 使用typemixin -->
    <div class="search">
      <el-select v-model="type" clearable placeholder="请选择类型">
      <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    </div>
    <base-table v-loading="loading" :columns="headers" :list="list" @reset="resetCb" @edit="editCb" @delete="deleteCb">
        <!-- 选择自定义slot -->
        <template slot="roleSlot" slot-scope="{scope}">
            {{scope.row.roleName}}
        </template>
    </base-table>
    <!-- 分页部分 使用mixin中的默认值-->
    <el-col :span="24" class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="pageSizes" :page-size="pageSize" :layout="pageLayout" :total="totalCount">
      </el-pagination>
    </el-col>
  </box-content>
</template>

<script>
import listMixins from '@/mixins/list'
import typeMixin from '@/mixins/types'
export default {
  name: 'list',
  mixins: [listMixins, typeMixin],
  data () {
    return {
      loading: false,
      type: '',
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
    load () {
      // api 方法中调用数据的加载然后调用 mixins中的callback  这里我们不做演示
      // demoApi().then((result) => {
      //   this.listSuccessCb().then(() => {
      //     // todo
      //     console.log('后续处理');
      //   })
      // }).catch((err) => {
      // })
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
    resetCb (data) {
      this.$message.success(`reset  ${data.loginName}`)
    },
    editCb (data) {
      this.$message.success(`edit  ${data.loginName}`)
    },
    deleteCb (data) {
      this.$message.success(`delete  ${data.loginName}`)
    }
  },
  created () {
    this.load()
  }
}
</script>
<style lang="less">
.search{
  margin:10px 0;
}
</style>

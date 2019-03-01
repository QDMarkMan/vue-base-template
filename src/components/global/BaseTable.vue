<template>
  <el-row>
    <el-col class="m-b-10" :span="24">
      <el-table :data="list" border size="mini" @selection-change="handleSelectionChange" :max-height="tableHeight" v-bind="$attrs"> <!--   -->
        <template v-for="(column, index) in columns">
          <slot name="front-slot"> </slot>
          <!-- 序号 -->
          <el-table-column :key="index" v-if="column.type === 'selection'" type="selection" width="55"> </el-table-column>
          <!-- 复选框 -->
          <el-table-column :key="index" v-else-if="column.type === 'index'"  type="index" width="50" label="序号"> </el-table-column>
          <!-- 具体内容 -->
          <el-table-column :key="index" v-else align="left" :label="column.title" :width="column.width">
            <template slot-scope="scope">
              <!-- 仅仅显示文字 -->
              <label v-if="!column.hidden"> <!-- 如果hidden为true的时候 那么当前格可以不显示，可以选择显示自定义的slot-->
                <!-- 操作按钮 -->
                <label v-if="column.type === 'operate'">
                  <a href="javascript:void(0)" class="operate-button" v-for="(operate, index) in column.operates" :key="index" @click="handleClick(operate, scope.row)">
                    {{operate.name}}
                    &nbsp;&nbsp;
                  </a>
                </label>
                <span v-else>
                  {{scope.row[column.key]}}
                </span>
              </label>
              <!-- 使用slot的情况下 -->
              <label v-if="column.slot">
                <!-- 具名slot -->
                <slot v-if="column.slot" :name="column.slot" :scope="scope"></slot>
              </label>
            </template>
          </el-table-column>
          <!-- 匿名slot -->
        </template>
        <slot/>
      </el-table>
    </el-col>
    <!-- 分页部分 -->
    <el-col :span="24" v-if="!hiddenPage" class="page">
      <el-pagination class="float-right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="pageSizes" :page-size="pageSize" :layout="pageLayout" :total="totalCount">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
/**
 * @author etongfu
 * @todo 项目中基本使用表格
 * @slot 1: defaultSlot：插入表格一行 2: front-slot：默认在表格开始处加一行 3:column内slot
 * @property
 * list => 表格数据
 * columns: [ ==> 配置表格头
 *  key: => 渲染字段名称
 *  title: => 表头名称
 *  operates： => 操作数组 [
 *      name: 名称
 *      emitKey: 要emit出去的事件
 *  ]
 * ]
 * demo columns
 * headers: [
        { type: 'selection'},
        { type: 'index'},
        { key: 'loginName', title: 'XXX' },
        { key: 'userName', title: 'XXX' },
        { key: 'roleName', title: 'XXX', hidden: true, slot: 'roleSlot' },
        { key: 'createDate', title: 'XXX' },
        // operate 这一行可以选择直接使用slot或者是使用配置项
        { type: 'operate', title: 'XXX',
          operates: [
            { name: 'XXX', emitKey: 'reset' },
            { name: 'XXX', emitKey: 'edit' },
            { name: 'XXX', emitKey: 'delete' }
        ] }
      ]
 */
export default {
  name: 'base-table',
  props: {
    // 核心数据
    list: {
      type: Array,
      default: () => []
    },
    // columns
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    // is hidden page for table
    hiddenPage: {
      type: Boolean,
      default: false
    },
    // page object
    pageNo: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 15
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pageSizes: [15, 20, 25, 30], // 页长数
      pageLayout: 'total, sizes, prev, pager, next, jumper' // 分页布局
    }
  },
  computed: {
    tableHeight () {
      return this.$store.state.custom.maxTableHeight
    }
  },
  methods: {
    // 处理点击事件
    handleClick (action, data) {
      // emit事件
      this.$emit(`${action.emitKey}`, data)
    },
    // 选中变化
    handleSelectionChange (val) {
      this.$emit('change-select', val)
    },
    // 页长变化
    handleSizeChange (val) {
      this.$emit('change-size', val)
    },
    // 页码变化
    handleCurrentChange (val) {
      this.$emit('change-page', val)
    }
  }
}
</script>

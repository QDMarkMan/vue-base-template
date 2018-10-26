<template>
  <div class="tree-table">
    树型表格
    <table class="table ivu-table ivu-table-default" border="0">
      <thead class="tree-table-header">
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            <label v-if="header.type === 'checkbox'">
                <input type="checkbox" v-model="checks" @click="handleCheckAll">
            </label>
            <label v-else>
              {{header.title}}
            </label>
            <label v-if="header.type === 'operate'">
              操作
            </label>
          </th>
        </tr>
      </thead>
      <tbody class="tree-table-body">
        <tr v-for="(tr,index) in list" :key="index">
          <td v-for="(td, tdIndex) in headers" :key="tdIndex">
            <label v-if="td.type === 'checkbox'">
                <input type="checkbox" v-model="checks" @click="handleChecks">
            </label>
            <span v-else>
              {{tr[td.key]}}
            </span>
            <label v-if="td.type === 'operate'">
              <a href="javascript:void(0)" v-for="(operate, index) in td.operates" :key="index" @click="handleOperate(operate, tr)">
                {{operate.name}}
              </a>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'tree-table',
  props: {
    // 首先生成表头
    headers: {
      type: Array,
      default: () => []
    },
    // 具体数据
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      checks: false
    }
  },
  methods: {
    handleChecks () {},
    // 选中全部
    handleCheckAll () { },
    // 处理操作点击
    handleOperate (operate, data) {
      this.$emit(`${operate.emitKey}`, data)
    }
  }
}
</script>

<style lang="less">
.tree-table {
  width: 100%;
}
.autoTbale {
    overflow: auto;
}
table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
}
.table-bordered {
    border: 1px solid #EBEBEB;
}
.table>tbody>tr>td,
.table>tbody>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
    border-top: 1px solid #e7eaec;
    line-height: 1.42857;
    padding: 8px;
    vertical-align: middle;
}
.table-bordered>tbody>tr>td,
.table-bordered>tbody>tr>th,
.table-bordered>tfoot>tr>td,
.table-bordered>tfoot>tr>th,
.table-bordered>thead>tr>td,
.table-bordered>thead>tr>th {
    border: 1px solid #e7e7e7;
}
.table>thead>tr>th {
    border-bottom: 1px solid #DDD;
}
.table-bordered>thead>tr>td,
.table-bordered>thead>tr>th {
    background-color: #F5F5F6;
}
#hl-tree-table>tbody>tr {
    background-color: #fbfbfb;
}
#hl-tree-table>tbody>.child-tr {
    background-color: #fff;
}
label {
    margin: 0 8px;
}
.ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 14px;
    height: 14px;
}
.ms-tree-space::before {
    content: ""
}
#hl-tree-table th>label {
    margin: 0;
}
</style>
</style>

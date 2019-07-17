<template>
  <div class="search-form" @keypress.enter="keyEnter($event)">
    <el-row>
      <slot/>
      <el-col :span="1">
        <div class="load-button text-center" v-if="hasSearch">
          <el-button icon="el-icon-search" size="mini" class="search-btn btn-green" @click="search"></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * @author: etongfu
 * @description: 通过查询表单
 * @prop {Boolean}  hasSearch 是否有查询按钮
 * @event search load
 * @returns:  {*}
 */
export default {
  name: "search-form",
  props: {
    // search 按钮
    hasSearch: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 回车事件 暂定直接进行搜索
    keyEnter (event) {
      this.$emit('search', event)
    },
    search () {
      this.$emit('search')
    }
  }
}
</script>

<style lang="less">
.search-form {
  width: 100%;
  // 搜索button
  .load-button{
    padding-left: 10px;
    display: inline-block;
  }
}
</style>

<template>
  <el-col class="search-item">
    <el-col class="label-wrap">
      <label class="l-34 search-item-label" :class="textAlign">{{label}}  {{label.length >= 2 ? ':' : ''}}</label>
    </el-col>
    <el-col class="search-input-wrap">
      <slot/>
    </el-col>
  </el-col>
</template>

<script>
export default {
  name: "search-item",
  props: {
    label: {
      type:String
    },
    //默认两端对齐
    textAlign: {
      type:String,
      default:'justify'
    }
  }
}
</script>
<style lang="less">
.search-item {
  display: inline-block;
  width: 23.5%;
  padding-bottom: 10px;
  .search-item-label{
    line-height: 34px;
    width: 100%;
    display: inline-block;
    padding:0 5px;
    height: 32px;
    //text-align-last: justify;
  }
}
.center {
  text-align:center;
}
.justify {
  text-align-last: justify;
}
// 媒体查询部分
@media screen and (min-width: 1680px) {
  .label-wrap{
    width: 21%;
  }
  .search-input-wrap{
    width: 78%;
  }
}
@media screen and (min-width: 1440px) and (max-width: 1680px) {
  .label-wrap{
    width: 28%;
  }
  .search-input-wrap{
    width: 71%;
  }
}
@media screen and (min-width: 1366px) and (max-width: 1440px) {
  .label-wrap{
    width: 30%;
  }
  .search-input-wrap{
    width: 69%;
  }
}
@media screen and (max-width: 1366px) {
  .label-wrap{
    width: 31%;
  }
  .search-input-wrap{
    width: 69%;
  }
}
</style>

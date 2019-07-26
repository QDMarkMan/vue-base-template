<!--
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-07-26 15:08:25
 * @LastEditors: etongfu
 * @LastEditTime: 2019-07-26 16:01:53
 * @Description: 简易版本面包屑
 * @YouWant: add you want info here
 -->
<template>
  <ul class="breadcrumbs">
    <li>
      <i class="bread-location "></i>
    </li>
    <li class="breadcrumb-item" v-for="(item, index) in crumbs" :key="index" :class="{'crumb-active': item.active}">
      <span v-if="index !== 0" class="breadcrumb-divider">
        {{divider}}
      </span>
      <i :class="item.icon"></i>
      <a v-if="item.path === ''" href="javascript:void(0);">
        {{item.name}}
      </a>
      <router-link v-else :to="item.path">
        {{item.name}}
      </router-link>
    </li>
  </ul>
</template>

<script>
/**
 * 简单面包屑
 * @property {*String} divider 自定义分割符号
 * @property {*Array<{name：String, icon: String, path: String, active: Boolean}>} 面包屑列表 
 */
export default {
  name: 'breads',
  props: {
    // 分割符号
    divider: {
      type: String,
      default: '/'
    },
    // 面包屑列表
    crumbs: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="less">
.breadcrumbs{
  display: flex;
  height: 100%;
  margin: 0;
  padding-bottom: 10px;
  align-items: center;
  > li {
    font-size: 14px;
    line-height: 1;
    display: flex;
    align-items: center;
    a {
      cursor: pointer;
      color:rgba(0,0,0,.58);
      font-weight: 600;
    }
    i {
      font-size: 16px;
    }
  }
  .breadcrumb-divider{
    margin: 0 10px;
    color: rgba(0,0,0,.38);
    font-weight: 700;
  }
  .crumb-active{
    a {
      color:@theme-color;
    }
  }
}
</style>
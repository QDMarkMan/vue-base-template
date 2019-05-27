<!--
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 列表页之间的骨架屏
 * @youWant: add you want info here
 * @Date: 2019-03-20 16:49:02
 * @LastEditTime: 2019-05-17 18:09:26
 -->
<template>
  <div class="skeleton-component"></div>
</template>

<script>
export default {
  name: 'skeleton',
  data() {
    false
  },
  methods: {
    toggleSkeleton(status) {
      this.open = status
    }
  }
}
</script>
<style lang="less"></style>

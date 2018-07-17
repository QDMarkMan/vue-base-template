<template>
  <header class="frameHeader">
    <img src="../../assets/logo.png" alt="" height="50px">
  </header>
</template>

<script>
export default {
  name: 'FrameHeader'
}
</script>

<style lang="less" scoped>
@import url('../../styles/variable.less');
.frameHeader{
  height: @header-height;
  background-color: #f1f1ff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>


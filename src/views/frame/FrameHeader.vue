<template>
  <header class="frameHeader">
    <img :class="{'center-logo': center}" src="../../assets/logo.png" alt="" height="50px">
  </header>
</template>

<script>
export default {
  name: 'FrameHeader',
  props: {
    // logo居中
    center: {
      type: Boolean,
      default: false
    }
  }
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
// logo居中显示
.center-logo{
  display: block;
  margin: 0 auto;
}
</style>


<template>
  <aside class="frame-side">
    
  </aside>
</template>

<script>
export default {
  name: 'FrameSide'
}
</script>

<style lang="less">
@import url('../../styles/variable.less');
.frame-side {
  width: @side-width;
  background-color: #f2f2f2;
  position: fixed;
  top: @header-height;
  bottom: 0;
}
</style>


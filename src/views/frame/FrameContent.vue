<template>
  <main class="frame-content">
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut" mode="out-in" class="animated">
      <router-view/>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'FrameContent',
}
</script>

<style lang="less">
@import url('../../styles/variable.less');
.frame-content{
  height: 100%;
  width: 100%;
  padding-top: @header-height;
  padding-left: @side-width !important;// 覆盖之前的样式
}
</style>


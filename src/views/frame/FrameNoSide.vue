<template>
  <div class="frame">
    <frame-header center />
    <section class="frame-container">
      <frame-content id="content" class="content-noside"></frame-content>
      <frame-footer />
  </div>
</template>

<script>
import { FrameHeader, FrameContent, FrameFooter } from './index'
export default {
  name: 'frame-noside',
  components: {
    [FrameHeader.name]: FrameHeader,
    [FrameContent.name]: FrameContent,
    [FrameFooter.name]: FrameContent
  }
}
</script>

<style lang="less">
.frame {
  height: 100%;
  width: 100%;
  .frame-container {
    height: 100%;
    width: 100%;
    // 无边框设置
    .content-noside {
      padding-left: 0 !important;
    }
  }
}
</style>

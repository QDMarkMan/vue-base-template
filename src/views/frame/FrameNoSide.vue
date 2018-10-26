<template>
  <div class="frame">
    <FrameHeader center></FrameHeader>
    <section class="frame-container">
			<FrameContent id="content" class="content-noside"></FrameContent>
      <FrameFooter></FrameFooter>
    </section>
  </div>
</template>

<script>
import { FrameHeader, FrameContent, FrameFooter } from "./index"
export default {
  name: 'Frame',
  components: {
    FrameHeader,
    FrameContent,
    FrameFooter
  }
}
</script>

<style lang="less">
.frame{
  height: 100%;
  width: 100%;
  .frame-container{
    height: 100%;
    width: 100%;
    // 无边框设置
    .content-noside{
      padding-left: 0 !important;
    }
  }
}
</style>


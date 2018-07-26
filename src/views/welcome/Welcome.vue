<template>
  <div class="timeline">
    <Timeline>
        <TimelineItem color="green">
          <Icon class="timeline-icon" type="trophy" slot="dot"></Icon>
          <span class="timeline-font">2018年6月26日</span>
          <p class="timeline-des">
            开始了这个这个东西的编写
          </p>
          <div class="timeline-link">
            <router-link to="/">查看列表版本首页</router-link>
          </div>
        </TimelineItem>
        <TimelineItem color="green">完成开发的搭建</TimelineItem>
    </Timeline>
  </div>
</template>
<script>
import {Timeline, TimelineItem} from 'iview'
export default {
  name: 'welcome',
  components: {
    Timeline,
    TimelineItem
  },
  data () {
    return {
      
    }
  }

}
</script>
<style lang="less">
.timeline{
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  .timeline-icon{
    font-size: 20px;
  }
  .timeline-font{
    font-weight: bold;
  }
}
</style>


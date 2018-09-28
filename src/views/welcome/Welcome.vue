<template>
  <div class="timeline">
    <Timeline>
        <TimelineItem v-for="(line, index) in timelines" :key="index" :color="line.color">
           <i v-if="line.icon" slot="dot" :class="line.icon"></i>
           <span class="timeline-font">{{line.time}}</span>
           <p class="timeline-des">{{line.des}}</p>
           <div v-if="line.imgUrl" class="timeline-img">
            <img src="" alt="">
          </div>
           <div class="timeline-link">
             <router-link :to="line.href">{{line.hrefName}}</router-link>
           </div>
        </TimelineItem>
        <!-- <TimelineItem color="green">完成开发的搭建</TimelineItem> -->
    </Timeline>
  </div>
</template>
<script>
import { Timeline, TimelineItem } from 'iview'
import timelines from './timeline-data.js'
export default {
  name: 'welcome',
  components: {
    Timeline,
    TimelineItem
  },
  data () {
    return {
      // 时间轴
      timelines: timelines
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
  .timeline-des{
    padding: 10px 0;
  }
}
</style>


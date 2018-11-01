<template>
  <div class="timeline">
    <!-- <Timeline>
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
    </Timeline> -->

    <v-timeline>
      <v-timeline-item
        v-for="(line, index) in timelines" 
        :key="index" 
        :color="line.color"
        large
      >
        <span slot="opposite">{{line.name}}</span>
        <v-card class="elevation-2">
          <v-card-title class="headline">{{line.name}}</v-card-title>
          <v-card-text>
            {{line.des}}
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="orange">
              <router-link :to="line.href">{{line.hrefName}}</router-link>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>
<script>
import timelines from './timeline-data.js'
export default {
  name: 'welcome',
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
  padding:0 50px;
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


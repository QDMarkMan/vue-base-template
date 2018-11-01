<template>
  <aside class="frame-side">
    <div class="frame-side-inner">
      <!-- <v-navigation-drawer
      v-model="drawer"
      permanent
      absolute
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    </div>
  </aside>
</template>

<script>
export default {
  name: 'FrameSide',
  data () {
    return {
      routers: this.$router.options.routes,
      showCol: false,
      drawer: false,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      mini: true,
      right: null
    }
  },
  computed: {
    currentPath () {
      return this.$router.currentRoute.fullPath
    }
  },
  created () {
    console.log(this.routers)
    console.log(this.currentPath)
  }
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
  .frame-side-inner{
    position: relative;
    height: 100%;
    margin: 10px;
    background-color: #fff;
  }
}
.side-colspan {
  cursor: pointer;
  position: relative;
  top: 10px;
  float: right;
  height: 20px;
  width: 30px;
  background-color: #fff;
  text-align: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  transition: all ease-in .2s;
  &:hover{
    background-color: @theme-color;
    color: #fff;
    width: 33px;
  }
}
.ivu-menu a{
  color: #495060;
}
</style>


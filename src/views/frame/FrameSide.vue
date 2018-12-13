<template>
  <aside class="frame-side">
    <div class="frame-side-inner">
      <el-col :span="24">
        <el-menu  
          :default-active="$route.path"  
          class="el-menu-vertical-demo"
          >
          <template v-for="item in routers">
              <router-link v-if="!item.hidden && item.noDropdown" :key="item.path" :to="item.path">
                  <el-menu-item :index="item.path" class='submenu-title-noDropdown'>
                      <i :class="item.icon"></i>
                      <span  slot="title">{{item.name}}</span>
                  </el-menu-item>
              </router-link>

              <el-submenu v-if="!item.hidden && !item.noDropdown" :key="item.path" :index="item.path">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span v-if="item.name">{{item.name}}</span>
                </template>

                <template v-for="child in item.children" v-if="!child.hidden">
                  <router-link :to="item.path+'/'+child.path" :key="child.path">
                    <el-menu-item :index="child.path" class='submenu-title-noDropdown'>
                      <span slot="title">{{child.name}}</span>
                    </el-menu-item>
                  </router-link>
                </template>
              </el-submenu>
          </template>
        </el-menu>
    </el-col>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'FrameSide',
  data () {
    return {
      routers: this.$router.options.routes
    }
  },
  computed: {
    currentPath () {
      return this.$router.currentRoute.fullPath
    }
  },
  created () {
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


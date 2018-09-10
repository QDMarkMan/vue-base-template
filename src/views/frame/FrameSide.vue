<template>
  <aside class="frame-side">
    <div class="frame-side-inner">
      <Menu width="auto" :active-name="currentPath" >
          <template v-for="item in routers">
              <template v-if="!item.hidden && item.noDropdown">
                <MenuItem :to="item.path" :name="item.path" :key="item.path">
                  <i :class="item.icon" :key="item.path"></i>
                  {{item.name}}
                </MenuItem>
              </template>
              <template v-if="!item.hidden && !item.noDropdown">
                <Submenu :key="item.path" :name="item.name">
                    <template slot="title">
                        <Icon type="ios-paper" />
                        {{item.name}}
                    </template>
                    <MenuItem name="2-1">新增用户</MenuItem>
                </Submenu>
              </template>
              
          </template>
      </Menu>
    </div>
    <div class="side-colspan" v-if="showCol">
      <i class="colspan-icon ivu-icon ivu-icon-ios-rewind"></i>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'FrameSide',
  data () {
    return {
      routers: this.$router.options.routes,
      showCol: false
    }
  },
  computed: {
    currentPath () {
      return this.$router.currentRoute.fullPath
    }
  },
  created() {
    console.log(this.routers)
    console.log(this.currentPath)
  },
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
    min-height: 20px;
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


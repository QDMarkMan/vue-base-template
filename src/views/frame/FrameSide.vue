<template>
  <aside class="frame-side">
    <div class="frame-side-inner">
      <Menu width="auto">
          <template v-for="item in routers" v-if="!item.hidden">
             <MenuItem :to="item.path" :key="item.path">
              <i :class="item.icon" :key="item.path"></i>
              {{item.name}}
            </MenuItem>
          </template>
          <Submenu name="1">
              <template slot="title">
                  <Icon type="ios-paper" />
                  内容管理
              </template>
              <MenuItem name="2-1">新增用户</MenuItem>
          </Submenu>
          <Submenu name="2">
              <template slot="title">
                  <Icon type="ios-people" />
                  用户管理
              </template>
              <MenuItem name="2-2">活跃用户</MenuItem>
          </Submenu>
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
  created() {
    console.log(this.routers)
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
</style>


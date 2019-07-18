import Vue from 'vue'
let components = require.context('.', false, /\.vue$/)
components.keys().forEach(component => {
  let componentEntity = components(component).default
  // 使用内置的组件名称 进行全局组件注册
  Vue.component(componentEntity.name, componentEntity)
})

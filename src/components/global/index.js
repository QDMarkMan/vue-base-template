import Vue from 'vue'
let contexts = require.context('.', false, /\.vue$/)
contexts.keys().forEach(component => {
  let componentEntity = contexts(component).default
  // 使用内置的组件名称 进行全局组件注册
  Vue.component(componentEntity.name, componentEntity)
})

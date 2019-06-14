const pkg = require('../package.json')
/**
 * 处理Version
 * @param {*} str 
 */
let dealVersion = str => str.indexOf('^') === -1 ? str : str.replace('^','')
// 需要排除打包的选项
const externals = {
  'vue': 'Vue',
  // 'element-ui': 'ElementUI',
  // 'echarts': 'echarts'
}
const jsCdnList = Object.keys(externals).map(el => {
  const version = dealVersion(pkg.dependencies[el])
  return el = `https://cdn.bootcss.com/${el}/${version}/${el}.min.js`
})
// js资源
// style 样式 这些不需要排除打包
const styleCdnList = [
  `https://cdn.bootcss.com/normalize/8.0.0/normalize.min.css`, 
  `https://cdn.bootcss.com/element-ui/2.8.2/theme-chalk/index.css`, 
  `https://cdn.bootcss.com/animate.css/3.7.0/animate.min.css`
]
module.exports = cdnResource = {
  externals,
  cdn: {
    // js: jsCdnList,
    js:[],
    styles: styleCdnList
  }
}


/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-06-11 13:47:53
 * @LastEditors: etongfu
 * @LastEditTime: 2019-07-23 09:52:47
 * @Description: 
 * @TODO: 使用 is-online 判断当前网络情况，如果网络断开。不使用cdn, 使用本地资源
 */
/* const isOnline = require('is-online');
(async () => {
    console.log(await isOnline());
    //=> true
})(); */
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


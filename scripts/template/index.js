/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-05-25 15:13:51
 * @LastEditors: etongfu
 * @LastEditTime: 2019-06-12 18:04:49
 * @Description: 文件生成模块重构==> 进行中
 * @youWant: add you want info here
 */

const fs = require('fs')
const path = require('path')
const { StringUtil } = require('../util')
const ENV = fs.readFileSync(path.resolve(__dirname, '../../.env.development.local'))
console.log(ENV.toString())
/**
 * 生成Vue template文件
 * @param {*} moduleName 
 */
module.exports.buildVueFile = (moduleName) => {
  const VueTemplate = fs.readFileSync(path.resolve(__dirname, './template.vue'))
  const builtTemplaye = StringUtil.replaceAll(VueTemplate.toString(), "module", moduleName)
  return builtTemplaye
}
/**
 * @author: etongfu
 * @description: 生成路由文件
 * @param {type}  {*}
 * @returns:  {*}
 */
module.exports.buildRouteFile = (moduleName) => {

}

/**
 * @author: etongfu
 * @description: 生成API文件
 * @param {type}  {*}
 * @returns:  {*}
 */
module.exports.buildApiFile = () => {
  
}
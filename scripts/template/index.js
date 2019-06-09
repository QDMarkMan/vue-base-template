/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-05-25 15:13:51
 * @LastEditors: etongfu
 * @LastEditTime: 2019-06-05 17:15:27
 * @Description: 文件生成模块重构==> 进行中
 * @youWant: add you want info here
 */

const fs = require('fs')
const path = require('path')

const VueTemplate = fs.readFileSync(path.resolve(__dirname, './template.vue'))

const myTemplaye = VueTemplate.toString().replace("$template", "aaa")

console.log(myTemplaye)

/**
 * 生成Vue template文件
 * @param {*} moduleName 
 */
module.exports.buildVueFile = (moduleName) => {
  
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
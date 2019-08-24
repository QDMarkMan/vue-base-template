/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-07-30 09:53:20
 * @LastEditors: etongfu
 * @LastEditTime: 2019-08-23 19:23:29
 * @Description: webpack util file
 * @YouWant: add you want info here
 */
const path = require('path')
const fs = require('fs')
/**
 * 自动获取src下目录并自动添加到webpack别名中
 * @param {*} extra 额外别名
 */
module.exports.getAllAlias = (extra = {}) => {
  const _rootSrc = path.resolve(__dirname, '../src')
  let files = fs.readdirSync(_rootSrc)
  let alias = files.reduce((pre, next) => {
    if (fs.statSync(path.join(_rootSrc, `${next}`)).isDirectory()) {
      pre[next] = path.join(_rootSrc, `${next}`)
    }
    return pre
  }, {})
  return Object.assign(extra, alias)
}

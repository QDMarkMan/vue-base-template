/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-07-30 09:53:20
 * @LastEditors: etongfu
 * @LastEditTime: 2019-07-30 10:21:27
 * @Description: webpack util file
 * @YouWant: add you want info here
 */
const path = require('path')
const fs = require('fs')
/**
 * 自动获取别名
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

/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @Date: 2019-06-27 11:56:43
 * @LastEditors: etongfu
 * @LastEditTime: 2019-07-04 14:28:04
 * @Description: webpack plugins
 * @youWant: add you want info here
 */
const webpack = require('webpack')
const CompressionPlugin = require("compression-webpack-plugin")
/**
 * @TODO 构建带配置的webpack Plugin
 * @param {*} use 
 * @param {*} plugin 
 */
/* const configPlugin = (use = false, condition = null , plugin) => Object.freeze({
  use,
  condition,
  plugin
}) */
/**
 * @author: etongfu
 * @description: GZIP plugin
 * @returns:  {*}
 */
module.exports.compressionPlugin =  Object.freeze({
  use: true,
  plugin: new CompressionPlugin({
    test:/\.js$|\.html$|.\css/, //匹配文件名
    threshold: 10240,//对超过10k的数据压缩
    deleteOriginalAssets: false //不删除源文件
  })
})
/**
 * @author: etongfu
 * @description: Dll plugin if
 * @returns:  {*}
 */
module.exports.dllPlugins = Object.freeze({
  use: false,
  plugin: new webpack.DllReferencePlugin({
    context: process.cwd(),
    manifest: require('../public/vendor/vendor-manifest.json')
  })
})
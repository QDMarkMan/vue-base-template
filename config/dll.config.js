/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version: 
 * @LastEditors: etongfu
 * @Description: webpack dll plugin 预编译配置, 如果需要就开启
 * @youWant: add you want info here
 * @Date: 2019-05-09 10:33:45
 * @LastEditTime: 2019-07-04 14:18:55
 */
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const dllPath = path.resolve(__dirname, '..', 'public/vendor')
module.exports = {
  mode: "production",
  entry: {
    // 核心依赖包 一些比较小的第三方依赖插件打包成vendor
    vendor: [
      'axios',
      'js-cookie',
      'vue-router',
      'vuex'
    ]
  },
  output: {
    path: dllPath,
    filename: '[name].dll.js',
    library: '[name]_library' 
  },
  optimization: {
    providedExports: true,
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        },
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
        /* 提高代码打包压缩速度 */
        cache: true,
        parallel: true
      })
    ]
  },
  plugins: [
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    /*
      "作用域提升(scope hoisting)",使代码体积更小[函数申明会产生大量代码](#webpack3)
    */
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllPlugin({
      path: path.join(dllPath, '.', '[name]-manifest.json'),
      name: '[name]_library', // 这个地方需要和target中得名字一样
      context: process.cwd()
    })
  ]
}

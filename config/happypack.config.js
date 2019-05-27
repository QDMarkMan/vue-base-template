/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Date: 2019-05-17 16:47:21
 * @LastEditors: etongfu
 * @LastEditTime: 2019-05-27 15:09:41
 * @Description: happypack config  在按时不使用
 * @youWant: add you want info here
 */
'use strict'
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });

// 开启系统全部线程池
const happypackPlugin = [
  // js
  new HappyPack({
    id: 'happyBabel',
    loaders: [{
      loader: 'babel-loader?cacheDirectory=true',
    }],
    threadPool: happyThreadPool,
    //允许 HappyPack 输出日志
    verbose: true,
  }),
  // css
  new HappyPack({
    id: 'happyCss',
    loaders: [{
      loader: 'css-loader?cacheDirectory=true',
    }],
    threadPool: happyThreadPool,
    //允许 HappyPack 输出日志
    verbose: true,
  })
]
module.exports = happypackPlugin
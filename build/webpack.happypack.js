'use strict'
/**
 * happypack config
 */
const HappyPack = require('happypack')
const os = require('os')
// 开启系统全部线程池
const happyThreadPool = HappyPack.ThreadPool({size:os.cpus().length - 1}) 
const happypackPlugin = [
  // js
  new HappyPack({
    id: 'happyBabel',
    loaders: ['babel-loader?cacheDirectory'],
    threadPool: happyThreadPool,
    verbose: true
  }),
  // file
  new HappyPack({
    id: 'url',
    loaders: ['url-loader'],
    threadPool: happyThreadPool
  })
]

module.exports = happypackPlugin
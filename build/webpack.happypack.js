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
    id: 'babel',
    loaders: ['babel-loader?cacheDirectory'],
    threadPool: happyThreadPool,
    cache: false,
    verbose: true
  }),
  // css
  new HappyPack({
    id: 'css',
    loaders: ['css-loader'],
    threadPool: happyThreadPool
  }),
  // vue
  new HappyPack({
    id: 'vue',
    loaders: ['vue-loader'],
    threadPool: happyThreadPool
  })
]

module.exports = happypackPlugin
const webpack = require('webpack')
const path = require('path')
const vueLoader = require('./vue-loader.conf')
const utils = require('./utils')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let resolveDir = dir =>  path.join(__dirname, '..', dir)
/**
 * 需要打包的第三方库文件 
 * 如果需要进行缓存的话 需要把所有的核心库都要加进来 目前只加进来了工具库
 */
const vendor = [
  "es6-promise",
  "vuex",
  "vue-router",
  "js-cookie",
  "axios",
  "iview"
]
const webpackConfig = {
  mode: 'production',
  context: __dirname,
  entry: {
    vendor
  },
  output:{
    path: resolveDir('/static/js/'),
    filename: '[name].dll.js',
    libraryTarget: "umd",
    library: '[name]_[hash]' // 
  },
  optimization: {
    // minimizer: true,
    providedExports: true,
    usedExports: true,
    //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
    //依赖于optimization.providedExports和optimization.usedExports
    sideEffects: true,
    //取代 new webpack.optimize.ModuleConcatenationPlugin()
    concatenateModules: true,
    //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
    noEmitOnErrors: true
  },
  plugins:[
    // 执行插件
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, '.' , '[name]-manifest.json'),
      name: '[name]_[hash]'
    }),
    // 压缩文件
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          warnings: false
        }
      },
      sourceMap: false,
      /* 提高代码打包压缩速度 */
      cache: true,
      parallel: true
    }),
    // 定义环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],
  module: {
    rules:[
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoader
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include:[resolveDir('src'), resolveDir('test'), resolveDir('node_modules/webpack-dev-server/client')]
      },
      {
        test: /.(png|jpe?g|gif|svg).(\?.*)?$/,
        loader: 'url=loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
      }
    ]
  }
}
module.exports = webpackConfig
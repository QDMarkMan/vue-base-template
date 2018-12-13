'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const chalk = require('chalk')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const pkg = require('../package.json')
const happypackPlugin = require('./webpack.happypack')
let resolve = dir => path.join(__dirname, '..', dir)
// 处理版本号
let dealVersion = str => str.indexOf('^') === -1 ? str : str.replace('^','')
console.log(chalk.cyan(`当前vue版本 ${dealVersion(pkg.dependencies.vue)}`))
// 需要排除的库 依赖包
const externals = {}
// 排除打包选项
if(process.env.NODE_ENV === 'production'){
  // 核心依赖包
  externals['vue'] = 'Vue'
  externals["babel-polyfill"] = 'window'
}
// 需要注入的cdn 引用的一些外部的样式
const assets = (process.env.NODE_ENV === 'production' ? [
  { path: `https://cdn.bootcss.com/vue/${dealVersion(pkg.dependencies.vue)}/vue.min.js`, type: 'js' },
] : []).concat([
  // dll包
  {path: `https://cdn.bootcss.com/normalize/8.0.0/normalize.min.css`, type: 'css'},
  {path: `https://cdn.bootcss.com/animate.css/3.5.2/animate.min.css`, type: 'css'}
])
// html plugin minifyConfig
const minifyConfig = {
  removeComments: true ,
  collapseWhitespace: true ,
  removeAttributeQuotes: true ,
  removeEmptyAttributes: true 
}
module.exports = {
  // mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ["babel-polyfill", "./src/main.js"], // 垫片
    element: ['element-ui']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  // 不需要打包的部分
  externals,
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'jquery': 'jquery',
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'views': path.resolve(__dirname, '../src/views'),
      'styles': path.resolve(__dirname, '../src/styles'),
      'api': path.resolve(__dirname, '../src/api'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'store': path.resolve(__dirname, '../src/store'),
      'router': path.resolve(__dirname, '../src/router'),
      'vendor': path.resolve(__dirname, '../src/vendor'),
      'static': path.resolve(__dirname, '../static')
    }
  },
  plugins: [
    //配置全局使用 jquery 本项目中没有使用
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery"
    }),
    // 添加DllReferencePlugin插件
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require('./vendor-manifest.json')
    }),
    new VueLoaderPlugin(),
    // html plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV  === 'production' ? config.build.index : 'index.html',
      template: 'index.ejs',
      inject: true,
      minify: process.env.NODE_ENV === 'production' ? minifyConfig : {},
      chunksSortMode: 'dependency'
    }),
    // 插入文件
    new HtmlWebpackIncludeAssetsPlugin({
      assets,
      append: process.env.NODE_ENV !== 'production',
      publicPath: '',
    }),
    // happypack配置
    ...happypackPlugin
  ],
  module: {
    noParse: /node_modules\/(iview\.js)/,
    rules: [
      ...(config.dev.useEslint? [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      }] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // loader: ['happypack/loader?id=happyVue'],
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: ['happypack/loader?id=happyBabel'],
        // loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
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

/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 当前项目配置文件
 * @youWant: add you want info here
 * @Date: 2019-04-24 17:45:34
 * @LastEditTime: 2019-08-21 17:45:05
 */
const path = require('path')
const chalk = require('chalk')
const TerserPlugin = require('terser-webpack-plugin');
const { Log, StringUtil } = require('./scripts/util')
const { compressionPlugin } = require('./config/plugins.config')
const { getAllAlias } = require('./config/util')
const resolve = dir => path.join(__dirname, dir)
const cdnResource = require('./config/cdn.config')
Log.logger(chalk.blue(`当前运行环境：${process.env.NODE_ENV}`))
/**
 * 全局文件变量注入
 * @param {*} rule 
 * @param {*} filePath 
 */
const addStyleResource = (rule, files) => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: files
    })
}
/**
 * 构建Webpack plugins 数组
 */
const buildPlugins = () => {
  let plugins = []
  // GZIP:  typeof(process.env.VUE_APP_GZIP) === string
  if (compressionPlugin.use && process.env.NODE_ENV !== "development" && StringUtil.toBoolean(process.env.VUE_APP_GZIP)) {
    Log.logger('Gzip Mode opened!')
    plugins.push(compressionPlugin.plugin)
  }
  return plugins
}
// 配置文件抛出
module.exports = {
  // publicPath: '/',
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : '/vue-base-template/dist/',
  publicPath: './', // 发布到github page上的配置路径
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: process.env.port || 8080
    // 接口代理需要使用的时候放开
    /* proxy: {
      '/api': {
          target: 'http://172.16.200.156:80/fods/a/',
          changeOrigin: true,
          pathRewrite: {
            '^/api/': ''
          }
      }
    } */
  },
  // css配置
  css: {
    loaderOptions: {
      css: {
        module: true
      },
      less: {
        // 这里的选项会传递给 less-loader
        javascriptEnabled: true
      }
    }
  },
  parallel: require('os').cpus().length > 1,
  // webpack 配置
  configureWebpack: {
    // document.title
    name: 'vue-base-template(V2)',
    // entry: [resolve('src/main.js')],
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      // 自动扫描文件
      extensions: ['.js', '.json', '.vue', '.less'],
      // 别名
      alias: getAllAlias({
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      })
    },
    // webpack 插件
    plugins: buildPlugins()
  },
  // webpack chain 配置
  chainWebpack: config => {
    // source map形式
    config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-module-eval-source-map'))
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // Whether the render function preserves spaces between all HTML tags If set to false, spaces between tags are ignored. This can slightly improve performance but may affect the layout of inline elements.
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    // 全局样式
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      {
        // less
        addStyleResource(config.module.rule('less').oneOf(type), [resolve('src/styles/variable.less')])
        // scss
        // addStyleResource(config.module.rule('sass').oneOf(type), [resolve('src/styles/variable.scss')])
      }
    )
    // html cdn注入
    const cdn = {
      ...cdnResource.cdn
    }
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
    // Runtime/packaging module split optimization
    if (process.NODE_ENV !== 'development') {
      config.optimization.splitChunks({
        chunks: 'all', // global components
        cacheGroups: {
          libs: {
            name: 'chunk-modules',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-element', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          // global components
          commons: {
            name: 'chunk-global',
            test: resolve('src/components/global'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
      // Multi-thread compression
      config.optimization.minimizer = [new TerserPlugin({})]
    }
  }
}

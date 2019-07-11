/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version:
 * @LastEditors: etongfu
 * @Description: 当前项目配置文件
 * @youWant: add you want info here
 * @Date: 2019-04-24 17:45:34
 * @LastEditTime: 2019-07-11 15:56:04
 */
const path = require('path')
const chalk = require('chalk')
const { Log, StringUtil } = require('./scripts/util')
const { compressionPlugin } = require('./config/plugins.config')
const resolve = dir => path.join(__dirname, dir)
const cdnResource = require('./config/cdn.config')
Log.logger(chalk.blue(`当前运行环境：${process.env.NODE_ENV}`))
/**
 * 全局less变量注入
 * @param {*} rule
 */
const addStyleResource = rule => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        // 公共变量
        resolve('src/styles/variable.less'),
        // TODO: 把css框架换到scss
        // resolve('src/styles/variable.scss')
      ]
    })
}
/**
 * 创建当前flutter plugin
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
        //使用css-module 用来代替scoped
        module: true
      },
      less: {
        // 这里的选项会传递给 less-loader
        javascriptEnabled: true
      }
    }
  },
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
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        api: resolve('src/api'),
        assets: resolve('src/assets'),
        component: resolve('src'),
        directives: resolve('src/directives'),
        mixins: resolve('src/mixins'),
        router: resolve('src/router'),
        store: resolve('src/store'),
        styles: resolve('src/styles'),
        utils: resolve('src/utils'),
        views: resolve('src/views')
      }
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
        // 渲染函数是否会保留所有 HTML 标签之间的空格 如果设置为 false，则标签之间的空格会被忽略。这能够略微提升一点性能但是可能会影响到内联元素的布局。
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    // 全局样式
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      {
        addStyleResource(config.module.rule('less').oneOf(type))
        // TODO: 把CSS框架换到scss
        // addStyleResource(config.module.rule('sass').oneOf(type))
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
    // 运行时/打包 模块拆分优化
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
      // 多线程压缩
      config.optimization.minimizer.push(new TerserJSPlugin({}))
    }
  }
}

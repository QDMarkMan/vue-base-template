/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @Version:
 * @LastEditors: etongfu
 * @Description: 当前项目配置文件
 * @youWant: add you want info here
 * @Date: 2019-04-24 17:45:34
 * @LastEditTime: 2019-05-27 17:10:17
 */
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const cdnResource = require('./config/cdn.config')
console.log(`当前运行环境：${process.env.NODE_ENV}`)
/**
 * 注入全局less变量
 * @param {*} rule
 */
const addStyleResource = rule => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        // 公共变量
        resolve('src/styles/variable.less')
      ]
    })
}
// 配置文件抛出
module.exports = {
  // publicPath: '/',
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/vue-base-template/dist/',
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
      extensions: ['.js', '.vue', '.json'],
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
    plugins: [
      // dll plugin
      /* new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
      }) */
    ]
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
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    // 修改less全局注入loader
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    const types = ['vue-modules', 'vue']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
    // html cdn注入
    const cdn = {
      ...cdnResource.cdn
    }
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
    // 运行时/打包模块拆分优化
    config.optimization.splitChunks({
      chunks: 'all',
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
  }
}

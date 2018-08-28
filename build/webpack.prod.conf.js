'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  // mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  optimization: {
    providedExports: true,
    usedExports: true,
    //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
    //依赖于optimization.providedExports和optimization.usedExports
    sideEffects: true,
    //取代 new webpack.optimize.ModuleConcatenationPlugin()
    concatenateModules: true,
    //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'all', //'all'|'async'|'initial'(全部|按需加载|初始加载)的chunks
      /* cacheGroups: {
        // 拆包选项
        ELementUI:{
          name: "chunk-ElementUI", // 单独将拆包
          priority: 20, // 权重
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        }
      }*/
    },
    //提取webpack运行时的代码
    runtimeChunk: {
      name: 'manifest'
    }
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // webpackV4 update
    // new VueLoaderPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      /* 提高代码打包压缩速度 */
      cache: true,
      parallel: true
    }),
    // css
    new MiniCssExtractPlugin({
      /**
       * filename 是指在你入口文件entry中引入生成出来的文件名，而chunkname是指那些未被在入口文件entry引入，但又通过按需加载（异步）模块的时候引入的文件。
       */
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // filename: utils.assetsPath('css/[contenthash].css'), // For long term caching use filename: [contenthash].css. Optionally add [name].
      chunkFilename: utils.assetsPath('css/[id].[contenthash].css'),
    }),
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ? { parser: require('postcss-safe-parser'), map: { inline: false } } : { parser: require('postcss-safe-parser'), discardComments: { removeAll: true } },
      cssProcessor: require('cssnano')
    }),
    // see https://github.com/ampedandwired/html-webpack-plugin move to base config
    /* new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true
      },
      chunksSortMode: 'dependency'
    }), */
    new webpack.HashedModuleIdsPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(), V4.0 废弃
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig

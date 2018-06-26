/**
 * webpack config for skeleton
 */
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const ssrPlugin = require('vue-server-renderer/server-plugin')

module.exports = {
  target: 'node',
  entry: {
    skeleton: '../src/skeleton.entry.js'
  },
  output: {
    path: path.join(__dirname, '../server-dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: '/\.vue$/',
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }  
    ]
  },
  externals: Object.keys(require('../package.json').dependencies),
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new ssrPlugin({
      filename: 'skeleton.json'
    })
  ]
}
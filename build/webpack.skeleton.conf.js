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
  }

}
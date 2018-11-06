const webpack = require('webpack');
const merge = require('webpack-merge')
const base = require('./webpack.base.conf');
const vueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = merge(base,{
  target: 'node',
  devtool: 'source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: [webpackNodeExternals({
    whitelist: /\.css$/
  })],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"devlopment"',
      'process.env.VUE_ENV': '"server"'
    }),
    new vueSSRServerPlugin()
  ]
})

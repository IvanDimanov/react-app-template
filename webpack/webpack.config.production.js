const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.config.common')
const getEnv = require('./getEnv')

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),

    new webpack.DefinePlugin({
      'process.env': getEnv()
    })
  ]
})

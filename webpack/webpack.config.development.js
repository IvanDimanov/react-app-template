const webpack = require('webpack')
const merge = require('webpack-merge')
const DashboardPlugin = require('webpack-dashboard/plugin')

const common = require('./webpack.config.common')
const getEnv = require('./getEnv')

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new DashboardPlugin(),

    new webpack.DefinePlugin({
      'process.env': getEnv()
    })
  ]
})

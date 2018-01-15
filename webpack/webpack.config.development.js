const merge = require('webpack-merge')
const DashboardPlugin = require('webpack-dashboard/plugin')
const common = require('./webpack.config.common')

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new DashboardPlugin()
  ]
})

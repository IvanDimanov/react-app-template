const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./config.common');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.ProgressPlugin(),
  ],
});

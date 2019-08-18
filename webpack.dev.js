const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    publicPath: 'http://localhost:5001/',
  },
  devServer: {
    contentBase: './dist/',
    hot: true,
    host: '0.0.0.0',
    port: 5001,
    public: 'http://localhost:5001',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});

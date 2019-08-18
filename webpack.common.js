const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index.tsx'],
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    alias: {
      '@testco': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  output: {
    path: path.resolve('./dist/'),
    filename: '[name]-[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!.gitignore']  // do not remove dist/.gitignore
    }),
    new HtmlWebpackPlugin({
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    }),
    new HtmlWebpackRootPlugin(),
  ]
};

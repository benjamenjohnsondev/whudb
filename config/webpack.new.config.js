var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const babelPlugins = [
  '@babel/plugin-transform-react-jsx',
  '@babel/plugin-transform-react-inline-elements',
  "@babel/plugin-proposal-class-properties"
];

const babel = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader',
  options: {
    presets: [
      ['@babel/preset-env', {
        useBuiltIns: 'usage',
        targets: {
          esmodules: false
        }
      }],
      '@babel/preset-react'
    ],
    plugins: [...babelPlugins]
  }
};

module.exports = {
  mode: "development",
  entry: {
    app: path.resolve('src/frontend/index.js'),
  },
  output: {
      path: path.join(__dirname, 'output'),
      filename: 'app.js'
  },
  devServer: {
    contentBase: path.resolve('output/'),
    compress: true,
    port: 8080,
    disableHostCheck: true,
    proxy: {
      '/api': 'http://localhost:3000'
    },
  },
  module: {
    rules: [
      babel
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'public/index.html'
  })]
};

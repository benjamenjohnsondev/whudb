const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dist = path.resolve('./dist/frontend');
const frontendEntry = {
  app: path.resolve('./frontend/src/index.js'),
};

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

const babelModule = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader',
  options: {
    presets: [
      ['@babel/preset-env', {
        useBuiltIns: 'usage',
        targets: {
          esmodules: true
        }
      }],
      '@babel/preset-react'
    ],
    plugins: [...babelPlugins]
  }
};

const frontendLegacy = {
  entry: frontendEntry,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(dist),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      babel
    ]
  },
};

const frontendModern = {
  entry: frontendEntry,
  output: {
    filename: '[name].mjs',
    path: path.resolve(dist),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      babelModule
    ]
  },
};

const backendConfig = {
  target: 'node',
  entry: {
    server: path.resolve('src/backend/server.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist/backend/')
  },
  module: {
    rules: [
      babel,
      {
        test: /\.graphql?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'webpack-graphql-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve('public'),
        to: dist
      }
    ])
  ]
};

module.exports = {
  backend: backendConfig,
  frontendLegacy: frontendLegacy,
  frontendModern: frontendModern
};

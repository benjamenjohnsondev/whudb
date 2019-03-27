const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const frontendDist = path.resolve('./dist/frontend');
const frontendEntries = {
  main: path.resolve('./src/frontend/index.js'),
  home: path.resolve('./src/frontend/App/Routes/Home.js'),
  sets: path.resolve('./src/frontend/App/Routes/Sets.js'),
  fourohfour: path.resolve('./src/frontend/App/Routes/FourOhFour.js'),
};

const babelPlugins = [
  '@babel/plugin-transform-react-jsx',
  '@babel/plugin-transform-react-inline-elements',
  '@babel/plugin-proposal-class-properties',
];

const babel = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          targets: {
            esmodules: false,
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [...babelPlugins],
  },
};

const babelModule = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          targets: {
            esmodules: true,
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [...babelPlugins],
  },
};

const frontendLegacy = {
  entry: frontendEntries,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(frontendDist),
  },
  module: {
    rules: [babel],
  },
};

const frontendModern = {
  entry: frontendEntries,
  output: {
    filename: '[name].mjs',
    path: path.resolve(frontendDist),
  },
  module: {
    rules: [babelModule],
  },
};

const backendConfig = {
  target: 'node',
  entry: {
    server: path.resolve('src/backend/server.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist/backend/'),
  },
  module: {
    rules: [
      babel,
      {
        test: /\.graphql?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'webpack-graphql-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve('public/assets'),
        to: path.resolve(frontendDist, 'assets'),
      },
    ]),
  ],
};

module.exports = {
  backend: backendConfig,
  frontendLegacy: frontendLegacy,
  frontendModern: frontendModern,
};

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const development = {
  mode: 'development'
};

const devBackend = merge(common.backend, development);

module.exports = [
  devBackend
];

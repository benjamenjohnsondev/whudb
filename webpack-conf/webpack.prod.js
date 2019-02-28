const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const production = {
  mode: 'production'
};

const prodModern = merge(common.frontendModern, production);
const prodLegacy = merge(common.frontendLegacy, production);
const prodBackend = merge(common.backend, production);

module.exports = [
  prodModern,
  prodLegacy,
  prodBackend
];

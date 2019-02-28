const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const development = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve('public'),
    watchContentBase: true, // initiate a page refresh if static content changes
    proxy: [ // allows redirect of requests to webpack-dev-server to another destination
      {
        context: ['/api', '/auth'], // can have multiple
        secure: false,
        target: 'https://localhost:3000', // server and port to redirect to
        changeOrigin: true
      },
    ],
    port: 8080, // port webpack-dev-server listens to, defaults to 8080
    overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: false, // defaults to false
      errors: false, // defaults to false
    },
  }
};

const developmentModern = merge(common.frontendModern, development);
const developmentLegacy = merge(common.frontendLegacy, development);
const developmentBackend = merge(common.backend, development);

module.exports = [
  developmentModern,
  developmentLegacy,
  developmentBackend
];

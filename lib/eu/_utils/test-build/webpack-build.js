const { merge } = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('../../../config/webpack/platform/production/webpack.config');

const webpackAdditionalConfig = {
  devtool: 'source-map',
};

const resultConfig = merge(webpackConfig, webpackAdditionalConfig);

module.exports.buildWebpack = () =>
  new Promise(async (resolve) => {
    try {
      webpack(resultConfig, (error, stats) => {
        if (error || stats.hasErrors()) {
          console.error('error in webpack build', error);
          process.exit(1);
        }

        resolve();
      });
    } catch (error) {
      console.error('error in webpack build', error);
      process.exit(1);
    }
  });

const dotenv = require('dotenv');
/* eslint-disable no-console */
// eslint-disable-next-line
const colors = require('colors');

dotenv.config();

const { processLogPackages } = require('./process-log-packages');
const { ROUTES_PACKAGE_NAME } = require('./_constants');

module.exports.NpmPackageVerifyer = async () => {
  try {
    await Promise.all(processLogPackages([ROUTES_PACKAGE_NAME]));
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.log(`${error}`.red);
    }
  }
};

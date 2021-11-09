const dotenv = require('dotenv');
/* eslint-disable no-console */
// eslint-disable-next-line
const colors = require('colors');

dotenv.config();

const { processLogPackages } = require('./process-log-packages');

module.exports.NpmPackageVerifyer = async () => {
  try {
    // eslint-disable-next-line
    const { packages } = require('../../../config/sdk-api/index.json');

    await Promise.all(processLogPackages(packages));
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.log(`${error}`.red);
    }
  }
};

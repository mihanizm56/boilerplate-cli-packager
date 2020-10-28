/* eslint-disable no-console */
// eslint-disable-next-line
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config();

const {
  getOutdatedPackageLog,
  getActualSuccessPackageLog,
} = require('./loggers');
const checkNpmPackageVersions = require('./check-npm-package-versions');

const executor = () => {
  try {
    // eslint-disable-next-line
    const { packages } = require('../../../config/sdk-api/index.json');

    packages.forEach(async packageName => {
      const {
        currentVersion,
        latestVersion,
        isActual,
      } = await checkNpmPackageVersions(packageName);

      if (isActual) {
        getActualSuccessPackageLog({
          version: currentVersion,
          packageName,
        });

        return;
      }

      getOutdatedPackageLog({
        packageName,
        currentVersion,
        latestVersion,
      });
    });
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.log(`${error}`.red);
    }
  }
};

executor();

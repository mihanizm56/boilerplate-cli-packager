const { checkNpmPackageVersions } = require('../check-npm-package-versions');
const {
  getActualSuccessPackageLog,
  getOutdatedPackageLog,
} = require('./loggers');

module.exports.processLogPackages = packages =>
  packages.map(async packageName => {
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

    return `npm install --no-audit --legacy-peer-deps ${packageName}@${latestVersion} -E`;
  });

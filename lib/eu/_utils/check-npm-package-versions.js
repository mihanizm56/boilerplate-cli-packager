const { exec } = require('../../utils/fs-promises');
const { dependencies } = require('../../package.json');

module.exports.checkNpmPackageVersions = async packageName => {
  if (!packageName) {
    throw new Error('package not defined');
  }

  const executedResult = await exec(
    `npm view ${packageName} versions  --json`,
    { shell: true, windowsHide: true },
  );

  const versionsList = JSON.parse(executedResult.stdout);

  const latestVersion = versionsList[versionsList.length - 1];
  const currentVersion = dependencies[packageName];

  return {
    currentVersion,
    latestVersion,
    isActual: currentVersion === latestVersion,
  };
};

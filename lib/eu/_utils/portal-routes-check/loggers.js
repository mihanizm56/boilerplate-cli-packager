/* eslint-disable no-console */
// eslint-disable-next-line
const colors = require('colors');
const { ROUTES_PACKAGE_NAME } = require('./_constants');

module.exports.getOutdatedPackageLog = ({
  packageName,
  currentVersion,
  latestVersion,
}) => {
  console.log();
  console.log(
    `(${'!'.red})${
      ` I've have found that you are using not the latest version of routes package "${packageName}"`
        .yellow.underline
    }`,
  );
  console.log('');
  console.log(`Current version: ${currentVersion}`.yellow);
  console.log('');
  console.log(`Latest version: ${latestVersion}`.green);
  console.log('');
  console.log(
    `Please, update the ${ROUTES_PACKAGE_NAME} package with command:`.yellow
      .underline,
  );
  console.log('');
  console.log(`npm install ${packageName}@${latestVersion} -E`.yellow);
};

module.exports.getActualSuccessPackageLog = ({ packageName, version }) => {
  console.log(
    `You are using the latest version of"${packageName}" package`.green
      .underline,
  );
  console.log('');
  console.log(`Version: ${version}`.green);
};

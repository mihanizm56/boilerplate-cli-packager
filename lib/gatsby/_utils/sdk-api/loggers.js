/* eslint-disable no-console */
// eslint-disable-next-line
const colors = require('colors');

module.exports.getOutdatedPackageLog = ({
  packageName,
  currentVersion,
  latestVersion,
}) => {
  console.log();
  console.log(
    `(${'!'.red})${
      ` I've have found that you are using not the latest version of SDK-API package "${packageName}"`
        .yellow.underline
    }`,
  );
  console.log('');
  console.log(`Current version: ${currentVersion}`.yellow);
  console.log('');
  console.log(`Latest version: ${latestVersion}`.green);
  console.log('');
  console.log(
    'Please, update the SDK-API package with command:'.yellow.underline,
  );
  console.log('');
  console.log(`npm install ${packageName}@${latestVersion}`.yellow);
};

module.exports.getActualSuccessPackageLog = ({ packageName, version }) => {
  console.log(
    `You are using the latest version of SDK-API package "${packageName}"`.green
      .underline,
  );
  console.log('');
  console.log(`Version: ${version}`.green);
};

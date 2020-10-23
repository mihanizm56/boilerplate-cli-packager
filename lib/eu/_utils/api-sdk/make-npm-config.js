const { exec } = require('../../../utils/fs-promises');

module.exports.makeNpmConfig = async () => {
  await exec('bash cli/_utils/api-sdk/generate-registry-npm.sh', {
    windowsHide: true,
    shell: true,
  });
};

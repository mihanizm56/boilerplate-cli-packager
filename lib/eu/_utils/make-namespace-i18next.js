const { exec } = require('child_process');

module.exports.makeNamespacei18next = namespace =>
  new Promise(async resolve => {
    await exec(`bash config/prepare-app-scripts/app-namespace.sh ${namespace}`);

    resolve();
  });

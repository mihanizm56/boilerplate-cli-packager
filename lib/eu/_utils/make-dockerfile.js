const { exec } = require('child_process');

module.exports.makeDockerFile = () =>
  new Promise(async (resolve) => {
    await exec('bash config/deploy/template_docker.sh');

    resolve();
  });

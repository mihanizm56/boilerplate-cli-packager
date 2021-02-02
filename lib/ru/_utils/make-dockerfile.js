const { exec } = require('child_process');

module.exports.makeDockerFile = routerPrefix =>
  new Promise(async resolve => {
    await exec(`bash config/deploy/template_docker.sh ${routerPrefix}`);

    resolve();
  });

const { exec } = require('child_process');
const { exec: execPromise } = require('../../../utils/fs-promises');
const pkgJson = require('../../../package.json');

const checkIfSourceMapExplorerLocalExist = () => {
  return JSON.stringify(pkgJson).includes('source-map-explorer');
};

const checkIfSourceMapExplorerGlobalExist = () => {
  return new Promise(async resolve => {
    try {
      const execProcess = await exec('npm ls -g source-map-explorer', {
        shell: true,
        windowsHide: true,
      });

      execProcess.stdout.on('data', data => {
        const isExist = !data.includes('empty');

        resolve(isExist);
      });

      execProcess.stderr.on('data', () => {
        console.error('get error in checkIfSourceMapExplorerExist');
        process.exit(1);
      });
    } catch (error) {
      console.error('get error in checkIfSourceMapExplorerExist', error);
      process.exit(1);
    }
  });
};

module.exports.processSourceMapsPackage = async () => {
  const isSourceMapExplorerGlobalExist = await checkIfSourceMapExplorerGlobalExist();

  const isSourceMapExplorerLocalExist = checkIfSourceMapExplorerLocalExist();

  if (isSourceMapExplorerLocalExist) {
    await execPromise(
      'npm uninstall source-map-explorer && npx npm-force-resolutions && npm i --legacy-peer-deps --no-audit',
      {
        shell: true,
        windowsHide: true,
      },
    );
  }

  if (!isSourceMapExplorerGlobalExist) {
    await execPromise(
      'npm install --no-audit --legacy-peer-deps source-map-explorer -g',
      {
        shell: true,
        windowsHide: true,
      },
    );
  }
};

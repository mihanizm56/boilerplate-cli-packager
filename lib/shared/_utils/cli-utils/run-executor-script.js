const { spawn } = require('child_process');
const { devServerLog } = require('../../../utils/dev-server-logger');
const { exec } = require('../../../utils/fs-promises');

module.exports.scriptExecute = async ({
  type,
  value,
  isDetached,
  isCiScript,
  isIOInherit,
}) =>
  new Promise(async resolve => {
    if (isIOInherit) {
      const child = spawn(type, [value], {
        shell: true,
        stdio: 'inherit',
      });

      resolve(child);

      return;
    }

    if (isCiScript) {
      const { stdout, stderr } = await exec(
        `node ./cli/_utils/ci-utils/executor.js --from-cli=true --command=${value}`,
      );

      devServerLog('info', 'stdout:', stdout);
      devServerLog('info', 'stderr:', stderr);

      process.exit();
      return;
    }

    const child = spawn(type, [value], { shell: true, detached: isDetached });

    resolve(child);

    child.stdout.on('data', chunk => {
      devServerLog('info', chunk.toString());
    });

    child.stderr.on('data', chunk => {
      devServerLog('info', chunk.toString());
    });

    child.stdout.on('error', error => {
      devServerLog('info', 'child process get error ', error);
      process.exit();
    });

    child.stderr.on('error', error => {
      devServerLog('info', 'child process get error ', error);
      process.exit();
    });

    child.on('close', code => {
      devServerLog('info', `child process exited with code ${code}`);
      process.exit();
    });
  });

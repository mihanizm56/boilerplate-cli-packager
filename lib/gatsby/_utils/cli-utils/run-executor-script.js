const { spawn } = require('child_process');
const { exec } = require('../../../utils/fs-promises');

module.exports.scriptExecute = async ({
  type,
  value,
  isDetached,
  isCiScript,
  isInteractiveScript,
}) =>
  new Promise(async (resolve) => {
    if (isCiScript) {
      const { stdout, stderr } = await exec(
        `node ./cli/_utils/ci-utils/executor.js --from-cli=true --command=${value}`,
      );

      console.log('stdout:', stdout);
      console.log('stderr:', stderr);

      process.exit();

      return;
    }

    if (isInteractiveScript) {
      const child = spawn(type, [value], {
        shell: true,
        detached: isDetached,
        stdio: 'inherit',
      });

      resolve(child);

      return;
    }

    const child = spawn(type, [value], { shell: true, detached: isDetached });

    resolve(child);

    child.stdout.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    child.stderr.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    child.stdout.on('error', (error) => {
      console.log('child process get error ', error);
      process.exit();
    });

    child.stderr.on('error', (error) => {
      console.log('child process get error ', error);
      process.exit();
    });

    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      process.exit();
    });
  });

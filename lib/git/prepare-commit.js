const { spawn } = require('child_process');
const { devServerLog } = require('../../utils/dev-server-logger');
const { isWindows } = require('../../utils/is-windows-platform');

// git commitizen runners
const LINUX_COMMAND = 'exec < /dev/tty && git cz --hook || true';
const WINDOWS_COMMAND = 'prepare-commit-msg';

const runPrecommitExecutor = () => {
  devServerLog(
    'info',
    'runPrecommitExecutor goes on platform ',
    process.platform,
  );

  const commandToExecute = isWindows() ? WINDOWS_COMMAND : LINUX_COMMAND;

  const child = spawn(commandToExecute, {
    shell: true,
  });

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
};

runPrecommitExecutor();

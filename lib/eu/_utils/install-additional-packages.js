const { exec } = require('child_process');
const { devServerLog } = require('../../utils/dev-server-logger');
const { processLog } = require('./process-log');
const { getArgs } = require('./get-args');

const additionalCommands = [
  'npm uninstall --force --no-audit --legacy-peer-deps commitizen -g',
];

const installAdditionalPackages = () => {
  devServerLog(
    'info',
    '============ running additional packages installation ============',
  );

  additionalCommands.forEach(async command => {
    try {
      const execProcess = await exec(command);

      execProcess.stdout.on('data', data => {
        devServerLog('info', data);
        processLog({ logString: data, process });
      });

      execProcess.stderr.on('data', data => {
        devServerLog('info', data);
        processLog({ logString: data, process });
      });
    } catch (error) {
      devServerLog('error', 'executor gets an error:', error);
      process.exit(1);
    }
  });
};

const processArgs = getArgs();

if (processArgs.run) {
  installAdditionalPackages();
}

module.exports = {
  installAdditionalPackages,
};

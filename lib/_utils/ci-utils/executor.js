const path = require('path');
const { exec } = require('child_process');
const { devServerLog } = require('../../../utils/dev-server-logger');
const { isWindows } = require('../../../utils/is-windows-platform');
const { processLog } = require('../process-log');
const { getArgs } = require('../get-args');
const {
  commandsMap,
  fullCheckSystem,
  fullCheckSystemWindows,
  fullCheckCommand,
} = require('./commands-map');

const processArgs = getArgs();

const command = processArgs.command;
const isFromCli = processArgs['from-cli'];
const commandFromMap = commandsMap[command];

devServerLog(
  'info',
  '==================================executor gets the command==================================',
);
devServerLog('info', command);
devServerLog(
  'info',
  '==================================is command from cli==================================',
);
devServerLog('info', Boolean(isFromCli));

const runner = async script => {
  try {
    const execProcess = await exec(script);

    execProcess.stdout.on('data', data => {
      devServerLog('info', data);
      processLog({ logString: data, isFromCli, process });
    });

    execProcess.stderr.on('data', data => {
      devServerLog('info', data);
      processLog({ logString: data, isFromCli, process });
    });

    execProcess.stdout.on('end', () =>
      devServerLog(
        'info',
        '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ STDOUT SUCCESFULL ENDED JOB $$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
      ),
    );
    execProcess.stderr.on('end', () =>
      devServerLog(
        'info',
        '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ STDERR SUCCESFULL ENDED JOB $$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
      ),
    );
  } catch (error) {
    devServerLog('error', 'executor gets an error:', error);
    process.exit(1);
  }
};

if (Boolean(command && commandFromMap)) {
  runner(commandFromMap);
} else if (command === fullCheckSystem) {
  // console.log('go to the root dir');
  process.chdir(path.join(__dirname, '..', '..', '..'));

  const isWindowsPlatform = isWindows();

  if (isWindowsPlatform) {
    runner(commandsMap[fullCheckSystemWindows]);
  } else {
    runner(commandsMap[fullCheckCommand]);
  }
} else {
  devServerLog('info', 'command not found');
}

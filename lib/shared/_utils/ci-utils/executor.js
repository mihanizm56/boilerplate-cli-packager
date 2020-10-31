const { exec } = require('child_process');
const { devServerLog } = require('../../../utils/dev-server-logger');
const { processLog } = require('../process-log');
const { getArgs } = require('../get-args');
const { commandsMap } = require('./commands-map');

const processArgs = getArgs();

const command = processArgs.command;
const isFromCli = processArgs['from-cli'];
const commandValueFromMap = commandsMap[command].value;
const commandTitleFromMap = commandsMap[command].title;

devServerLog(
  'info',
  '==================================executor gets the command==================================',
);
devServerLog('info', commandTitleFromMap);
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
        '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ STDOUT SUCCESSFULL ENDED JOB $$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
      ),);
    execProcess.stderr.on('end', () =>
      devServerLog(
        'info',
        '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ STDERR SUCCESSFULL ENDED JOB $$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
      ),);
  } catch (error) {
    devServerLog('error', 'executor gets an error:', error);
    process.exit(1);
  }
};

if (Boolean(command && commandValueFromMap)) {
  runner(commandValueFromMap);
} else {
  devServerLog('info', 'command not found');
}

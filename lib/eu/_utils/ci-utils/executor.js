/* eslint-disable no-console */

const path = require('path');
const { exec } = require('child_process');
// eslint-disable-next-line
const colors = require('colors');
const { devServerLog } = require('../../../utils/dev-server-logger');
const { processLog } = require('../process-log');
const { getArgs } = require('../get-args');
const {
  commandsMap,
  fullCheckSystem,
  fullCheckCommand,
} = require('./commands-map');

const processArgs = getArgs();

const command = processArgs.command;
const isFromCli = processArgs['from-cli'];
const commandValueFromMap = commandsMap[command].value;
const commandTitleFromMap = commandsMap[command].title;

console.log(
  `Running the command: ${commandTitleFromMap.yellow.underline}`.yellow,
);

const runner = async script => {
  try {
    let resultLog = '';

    const execProcess = await exec(script);

    execProcess.stdout.on('data', data => {
      resultLog += data;
      processLog({ logString: resultLog, isFromCli, process });
    });

    execProcess.stderr.on('data', data => {
      resultLog += data;
      processLog({ logString: resultLog, isFromCli, process });
    });

    execProcess.stdout.on('end', () =>
      console.log(
        `Successfull finished command: ${command.green.underline}`.green,
      ),
    );
  } catch (error) {
    devServerLog('error', 'executor gets an error:', error);
    process.exit(1);
  }
};

if (Boolean(command && commandValueFromMap)) {
  runner(commandValueFromMap);
} else if (command === fullCheckSystem) {
  // console.log('go to the root dir');
  process.chdir(path.join(__dirname, '..', '..', '..'));

  runner(commandsMap[fullCheckCommand]);
} else {
  devServerLog('info', 'command not found');
  process.exit(1);
}

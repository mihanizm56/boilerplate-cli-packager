const { exec } = require('child_process');
const { processLog } = require('./process-log');
const { getArgs } = require('./get-args');

const additionalCommands = ['npm uninstall --force commitizen -g'];

const installAdditionalPackages = () => {
  console.log(
    '============ running additional packages installation ============',
  );

  additionalCommands.forEach(async command => {
    try {
      const execProcess = await exec(command);

      execProcess.stdout.on('data', data => {
        console.log(, data);
        processLog({ logString: data, process });
      });

      execProcess.stderr.on('data', data => {
        console.log(, data);
        processLog({ logString: data, process });
      });
    } catch (error) {
      console.log('executor gets an error:', error);
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

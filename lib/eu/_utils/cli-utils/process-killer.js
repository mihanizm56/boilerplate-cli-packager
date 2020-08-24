const { exec } = require('child_process');
const { isWindows } = require('../../../utils/is-windows-platform');

const KILLER_WIN_COMMAND = 'taskkill /F /IM node.exe';

const getKillerTaskForLin = port => `sudo kill $(sudo lsof -t -i:${port})`;

const linPorts = ['443', '3000', '5000'];

module.exports.processKiller = async () => {
  if (isWindows()) {
    await exec(KILLER_WIN_COMMAND);

    return;
  }

  await linPorts.forEach(async port => {
    await exec(getKillerTaskForLin(port));
  });
};

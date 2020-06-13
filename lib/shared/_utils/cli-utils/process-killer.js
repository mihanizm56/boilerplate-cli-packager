const { exec } = require('child_process');
const { isWindows } = require('../../../_utils/is-windows-platform');

const KILLER_WIN_COMMAND = 'taskkill /F /IM node.exe';

const getKillerTaskForLin = port => `sudo kill $(sudo lsof -t -i:${port})`;

const linPorts = [
  '3000',
  '3001',
  '3002',
  '3003',
  '5000',
  '5003',
  '5005',
  '8000',
  '8080',
  '8081',
  '8082',
];

module.exports.processKiller = async () => {
  if (isWindows()) {
    await exec(KILLER_WIN_COMMAND);

    return;
  }

  await linPorts.forEach(async port => {
    await exec(getKillerTaskForLin(port));
  });
};

/* eslint-disable prefer-template */
const { spawn } = require('child_process');
const path = require('path');
const { writeFile, unlink, readFile } = require('../../utils/fs-promises');
const { getArgs } = require('./get-args');

const processArgs = getArgs();

const updateMod = processArgs.mod;

const PATH_TO_TEMP = path.join(process.cwd(), 'temp.sh');
const PATH_TO_EURO = path.join(
  __dirname,
  'update-helper-scripts',
  'update-euro.sh',
);
const PATH_TO_RU = path.join(
  __dirname,
  'update-helper-scripts',
  'update-ru.sh',
);

const updateConfigs = {
  euro: PATH_TO_EURO,
  ru: PATH_TO_RU,
};

const updateToMod = async mod => {
  try {
    await unlink(PATH_TO_TEMP);
  } catch {
    console.error('file not exist');
  }

  const fileContent = await readFile(updateConfigs[mod], 'utf-8');
  await writeFile(PATH_TO_TEMP, fileContent);

  spawn(`bash ${PATH_TO_TEMP}`, {
    shell: true,
    stdio: 'inherit',
  });
};

updateToMod(updateMod);

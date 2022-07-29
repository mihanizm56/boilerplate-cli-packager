/* eslint-disable prefer-template */
const { spawn } = require('child_process');
const path = require('path');
const { writeFile, unlink, readFile } = require('../../utils/fs-promises');

const PATH_TO_TEMP = path.join(process.cwd(), 'temp.sh');
const PATH_TO_SH = path.join(__dirname, 'update-helper-scripts', 'update.sh');

const updateToMod = async () => {
  try {
    await unlink(PATH_TO_TEMP);
  } catch {
    console.error('file not exist');
  }

  const fileContent = await readFile(PATH_TO_SH, 'utf-8');

  await writeFile(PATH_TO_TEMP, fileContent);

  spawn(`bash ${PATH_TO_TEMP}`, {
    shell: true,
    stdio: 'inherit',
  });
};

updateToMod();

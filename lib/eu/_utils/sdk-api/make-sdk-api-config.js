const path = require('path');
const { writeFile } = require('../../../utils/fs-promises');

const pathToWriteFile = path.join(
  process.cwd(),
  'config',
  'sdk-api',
  'index.json',
);
module.exports.makeSDKAPIConfig = async packagesString => {
  const packages = packagesString.split(',');

  await writeFile(
    pathToWriteFile,
    JSON.stringify(
      {
        packages,
      },
      null,
      2,
    ),
    'utf8',
  );
};

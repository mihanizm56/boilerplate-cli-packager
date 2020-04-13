const path = require('path');
const { readFile, writeFile } = require('../../utils/fs-promises');

const pathToPackageJson = path.join(__dirname, '..', '..', 'package.json');

module.exports.setProjectName = async projectName => {
  const packageJsonFile = JSON.parse(
    await readFile(pathToPackageJson, 'utf-8'),
  );

  const updatedPackageJson = JSON.stringify(
    {
      ...packageJsonFile,
      name: projectName,
    },
    null,
    2,
  );

  await writeFile(pathToPackageJson, updatedPackageJson);
};

const path = require('path');
const { writeFile } = require('./fs-promises');
const { getCommandsPath } = require('./get-commands-path');

module.exports.packageJsonPatch = async parameter => {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAaaparameter', parameter);

  try {
    // eslint-disable-next-line
    const commandsFile = require(getCommandsPath(parameter));

    const packageJsonProjectFile = require(path.join(process.cwd(),'package.json')); // eslint-disable-line

    const newPackage = {
      ...packageJsonProjectFile,
      scripts: {
        ...packageJsonProjectFile.scripts,
        ...commandsFile.scripts,
      },
      devDependencies: {
        ...packageJsonProjectFile.devDependencies,
        ...commandsFile.devDependencies,
      },
    };

    await writeFile(
      path.join(process.cwd(), 'package.json'),
      JSON.stringify(newPackage, null, 2),
      'utf8',
    );
  } catch (error) {
    console.log('get an error when getting package', error);
  }
};

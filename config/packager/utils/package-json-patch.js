const path = require('path');
const commandsFileEU = require('../commands/commands-eu.json');
const commandsFileRU = require('../commands/commands-ru.json');
const { writeFile } = require('./fs-promises');

module.exports.packageJsonPatch = async parameter => {
  try {
    const commandsFile = parameter === 'eu' ? commandsFileEU : commandsFileRU;

    const { scripts, devDependencies, dependencies } = commandsFile;

    const packageJsonProjectFile = require(path.join(process.cwd(),'package.json')); // eslint-disable-line

    const newPackage = {
      ...packageJsonProjectFile,
      scripts,
      dependencies: {
        ...packageJsonProjectFile.dependencies,
        ...dependencies,
      },
      devDependencies: {
        ...packageJsonProjectFile.devDependencies,
        ...devDependencies,
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

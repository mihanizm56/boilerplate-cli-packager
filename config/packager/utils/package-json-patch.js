const path = require('path');
const commandsFile = require('../commands/commands.json');
const { writeFile } = require('./fs-promises');

module.exports.packageJsonPatchEU = async () => {
  try {
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
      husky: {
        hooks: {
          'commit-msg':
            'commitlint -E HUSKY_GIT_PARAMS -g config/git/commitlint.js',
          'pre-commit':
            'node cli/_utils/ci-utils/executor.js --command=check-full',
          'prepare-commit-msg': 'node config/git/prepare-commit.js',
        },
      },
      'config-overrides-path': 'config/webpack/config-overrides.js',
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

module.exports.packageJsonPatchRU = async () => {
  try {
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
      husky: {
        hooks: {
          'commit-msg':
            'commitlint -E HUSKY_GIT_PARAMS -g config/git/commitlint.js',
          'pre-commit':
            'node cli/_utils/ci-utils/executor.js --command=check-full',
          'prepare-commit-msg': 'node config/git/prepare-commit.js',
        },
      },
      'config-overrides-path': 'config/webpack/config-overrides.js',
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

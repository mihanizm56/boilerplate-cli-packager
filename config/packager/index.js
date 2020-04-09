#!/usr/bin/env node

const path = require('path');
const Copier = require('@mihanizm56/node-file-copier');
const { exec, writeFile } = require('./fs-promises');
const commandsFile = require('./commands/commands.json');

const fromFolder = path.join(
  process.cwd(),
  'node_modules',
  '@wildberries',
  'boilerplate-cli-packager',
  'lib',
);

const toFolder = path.join(process.cwd(), 'cli');

const arrayToCopy = [{ from: fromFolder, to: toFolder }];

const copier = new Copier({ arrayToCopy });

const addPackageJsonCommands = async () => {
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

const runPackage = async () => {
  try {
    await addPackageJsonCommands();

    await exec('npm install @wildberries/boilerplate-cli-packager');

    copier.activate();

    await exec('npm uninstall @wildberries/boilerplate-cli-packager');
  } catch (error) {
    console.log("error when executing the package", error); // eslint-disable-line
  }
};

runPackage();

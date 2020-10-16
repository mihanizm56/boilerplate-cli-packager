#!/usr/bin/env node

const path = require('path');
const Copier = require('@mihanizm56/node-file-copier');
const colors = require('colors');
const cliProgress = require('cli-progress');
const { exec } = require('./utils/fs-promises');
const { getConsoleArgs } = require('./utils/get-args');
const { packageJsonPatch } = require('./utils/package-json-patch');
const { getConfigFolderPrefix } = require('./utils/get-config-folder-prefix');

const flags = getConsoleArgs(process.argv);

const configFolderPrefix = getConfigFolderPrefix(flags);

const fromFolder = path.join(
  process.cwd(),
  'node_modules',
  '@wildberries',
  'boilerplate-cli-packager',
  'lib',
  configFolderPrefix,
);

const toFolder = path.join(process.cwd(), 'cli');
const arrayToCopy = [{ from: fromFolder, to: toFolder }];

const copier = new Copier({ arrayToCopy });

const cliProgressBar = new cliProgress.SingleBar({
  format: `CLI Progress |${colors.magenta(
    '{bar}',
  )}| {percentage}% || Config-packager execution`,
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
});

const cliRunner = cliProgressBar.create(100, 0);
cliRunner.update(20);

const runPackage = async () => {
  try {
    await exec('npm install @wildberries/boilerplate-cli-packager');
    cliRunner.update(40);

    copier.activate();
    cliRunner.update(60);

    await packageJsonPatch(configFolderPrefix);
    cliRunner.update(80);

    await exec('npm uninstall @wildberries/boilerplate-cli-packager');
    cliRunner.update(100);
  } catch (error) {
    console.log('error when executing the package', error);
    process.exit(1);
  }
};

runPackage();

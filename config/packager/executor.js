#!/usr/bin/env node

const path = require('path');
const Copier = require('@mihanizm56/node-file-copier');
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

const runPackage = async () => {
  try {
    console.log('(cli): start to execute');

    await exec('npm install @wildberries/boilerplate-cli-packager');

    console.log('(cli): start to copy');

    copier.activate();

    console.log('(cli): start to patch package.json');

    await packageJsonPatch(configFolderPrefix);

    console.log('(cli): package.json patched successfuly');

    await exec('npm uninstall @wildberries/boilerplate-cli-packager');
  } catch (error) {
    console.log('error when executing the package', error);
  }
};

runPackage();

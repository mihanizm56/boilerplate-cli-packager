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
    console.log('[CLI]: installing');
    await exec(
      'npm install --force --no-audit --legacy-peer-deps @wildberries/boilerplate-cli-packager',
    );

    console.log('[CLI]: generate files');
    copier.activate();

    console.log('[CLI]: update package.json');
    await packageJsonPatch(configFolderPrefix);

    console.log('[CLI]: uninstalling');
    await exec(
      'npm uninstall --force --no-audit --legacy-peer-deps @wildberries/boilerplate-cli-packager',
    );
  } catch (error) {
    console.log('[CLI]: error when executing the package', error);
    process.exit(1);
  }
};

runPackage();

#!/usr/bin/env node

const path = require('path');
const Copier = require('@mihanizm56/node-file-copier');
const { exec } = require('./fs-promises');

const fromFolder = path.join(
  process.cwd(),
  'node_modules',
  '@@wildberries',
  'boilerplate-cli-packager',
  'lib',
);

const toFolder = path.join(process.cwd(), 'config');

const arrayToCopy = [{ from: fromFolder, to: toFolder }];

const copier = new Copier({ arrayToCopy });

const runPackage = async () => {
  try {
    await exec('npm install @wildberries/boilerplate-cli-packager');

    copier.activate();

    await exec('npm uninstall @wildberries/boilerplate-cli-packager');
  } catch (error) {
    console.log('error when executing the package', error); // eslint-disable-line
  }
};

runPackage();

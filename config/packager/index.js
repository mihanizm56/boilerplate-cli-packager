#!/usr/bin/env node

const path = require('path');
const Copier = require('@mihanizm56/node-file-copier');
const { exec } = require('./fs-promises');

const fromFolder = path.join(
  process.cwd(),
  'node_modules',
  '@mihanizm56',
  'cli-fun-react',
  'lib',
);

const toFolder = path.join(process.cwd(), 'config');

const arrayToCopy = [{ from: fromFolder, to: toFolder }];

const copier = new Copier({ arrayToCopy });

const runPackage = async () => {
  try {
    await exec('npm install @mihanizm56/cli-fun-react');

    copier.activate();

    await exec('npm uninstall @mihanizm56/cli-fun-react');
  } catch (error) {
    console.log('error when executing the package', error); // eslint-disable-line
  }
};

runPackage();

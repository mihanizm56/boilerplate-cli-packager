#!/bin/bash

rm -fr config
rm -fr cli
rm -fr integration-tests

npx @wildberries/boilerplate-config-packager --euro &&
npx @wildberries/boilerplate-cli-packager --euro &&
npm i --legacy-peer-deps --no-audit &&
npx npm-force-resolutions &&
npm i --legacy-peer-deps --no-audit

rm -rf temp.sh

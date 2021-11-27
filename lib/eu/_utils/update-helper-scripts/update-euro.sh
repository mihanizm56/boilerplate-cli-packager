#!/bin/bash

PACKAGE_JSON_PATH=package.json
NEW_BABEL_CONFIG=''
OLD_BABEL_CONFIG='"extends": "./config/babel/babel.config.json"'

rm -fr config
rm -fr cli
rm -fr deploy-service-client.conf.yaml
rm -fr k8s
rm -fr integration-tests
rm -fr .env

sed -i --expression "s@${OLD_BABEL_CONFIG}@$NEW_BABEL_CONFIG@" $PACKAGE_JSON_PATH

npx @wildberries/boilerplate-config-packager --euro &&
npx @wildberries/boilerplate-cli-packager --euro &&
npm i &&
npx npm-force-resolutions &&
npm i

npm run setup

rm -rf temp.sh

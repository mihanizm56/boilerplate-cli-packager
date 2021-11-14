#!/bin/bash

rm -fr config
rm -fr cli
rm -fr deploy-service-client.conf.yaml
rm -fr k8s
rm -fr integration-tests
rm -fr .env

npx @wildberries/boilerplate-config-packager &&
npx @wildberries/boilerplate-cli-packager &&
npm i -f &&
npx npm-force-resolutions &&
npm i -f

npm run setup

rm -rf temp.sh
#!/bin/bash

rm -fr config
rm -fr cli
rm -fr deploy-service-client.conf.yaml
rm -fr k8s
rm -fr integration-tests
rm -fr .env

npx @mihanizm56/boilerplate-config-packager &&
npx @mihanizm56/boilerplate-cli-packager &&
npm i --no-audit --legacy-peer-deps &&
npx npm-force-resolutions &&
npm i --no-audit --legacy-peer-deps

rm -rf temp.sh
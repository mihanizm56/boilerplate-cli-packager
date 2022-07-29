#!/bin/bash

rm -fr config
rm -fr cli
rm -fr integration-tests

npx @wildberries/boilerplate-config-packager --euro &&
npx @wildberries/boilerplate-cli-packager --euro &&
npm i --legacy-peer-deps --no-audit &&
npx npm-force-resolutions &&
npm i --legacy-peer-deps --no-audit


npm uninstall mini-css-extract-plugin \
react-dev-utils \
compression-webpack-plugin &&

npm uninstall -D eslint \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser \
eslint-config-airbnb \
eslint-config-prettier \
eslint-config-react-app \
eslint-import-resolver-alias  \
eslint-import-resolver-typescript  \
eslint-loader  \
eslint-plugin-css-modules \
eslint-plugin-flowtype \
eslint-plugin-import \
eslint-plugin-jsx-a11y \
eslint-plugin-prettier  \
eslint-plugin-react \
eslint-plugin-react-hooks \
eslint-plugin-security \
eslint-plugin-unused-imports \
prettier \
stylelint \
stylelint-config-recommended-scss \
stylelint-config-standard \
stylelint-order \
stylelint-scss \
npm-force-resolutions &&

rm -fr .stylelintinfo && rm -fr .eslintinfo &&

# remove temp file
rm -rf temp.sh &&

# save and call precommit
git add . && git commit --no-edit
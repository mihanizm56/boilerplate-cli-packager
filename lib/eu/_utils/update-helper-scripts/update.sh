#!/bin/bash

rm -fr config &&
rm -fr cli &&
rm -fr integration-tests &&

npm uninstall -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-airbnb eslint-config-prettier eslint-config-react-app eslint-import-resolver-alias eslint-import-resolver-typescript eslint-loader   eslint-plugin-css-modules eslint-plugin-flowtype eslint-plugin-import eslint-plugin-jsx-a11y  eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks   eslint-plugin-security     eslint-plugin-unused-imports prettier &&

npm uninstall compression-webpack-plugin customize-cra-react-refresh  mini-css-extract-plugin compress react-dev-utils &&

npx @wildberries/boilerplate-config-packager --euro &&
npx @wildberries/boilerplate-cli-packager --euro &&
rm -fr node_modules &&
npm i --legacy-peer-deps --no-audit &&
npx npm-force-resolutions &&
npm i --legacy-peer-deps --no-audit

rm -rf temp.sh

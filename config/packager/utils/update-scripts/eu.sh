#!/bin/bash

rm -fr config &&
rm -fr cli &&
rm -fr integration-tests &&
rm -fr .editorconfig &&

npm uninstall --legacy-peer-deps --no-audit -D editorconfig-checker node-fetch on-headers stylelint stylelint-config-recommended-scss stylelint-config-standard stylelint-order stylelint-scss helmet @typescript-eslint/eslint-plugin npm-audit-resolver source-map-explorer @typescript-eslint/parser eslint eslint-config-airbnb eslint-config-prettier eslint-config-react-app eslint-import-resolver-alias eslint-import-resolver-typescript eslint-loader   eslint-plugin-css-modules eslint-plugin-flowtype eslint-plugin-import eslint-plugin-jsx-a11y  eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks   eslint-plugin-security     eslint-plugin-unused-imports prettier &&

npm uninstall --legacy-peer-deps --no-audit node-sass http-proxy-middleware on-headers helmet npm-audit-resolver node-fetch source-map-explorer compression-webpack-plugin customize-cra-react-refresh  mini-css-extract-plugin compress compression react-dev-utils &&

npx @wildberries/boilerplate-config-packager --euro &&
npx @wildberries/boilerplate-cli-packager --euro &&
rm -fr node_modules &&
rm -fr package-lock.json &&
npm i --legacy-peer-deps --no-audit

rm -rf temp.sh

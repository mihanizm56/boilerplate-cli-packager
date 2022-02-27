// eslint-disable-next-line
const colors = require('colors');
const { browserSettings } = require('../get-testcafe-browser-configs');

const moduleBuildCommand = 'module-build';
const CRABuildCommand = 'cra-build';
const testCommand = 'test';
const testCoverateCommand = 'test-coverage';
const fullCheckCommand = 'check-full';
const fullCheckSystemWindows = 'check-full-windows';
const fullCheckSystem = 'check-full-system';
const fullLintCheckCommand = 'lint-full';
const integrationTests = 'integration-tests';
const checkTypes = 'check-types';
const editorconfigCheck = 'editorconfig-check';

const commandsMap = {
  [integrationTests]: {
    title: 'Интеграционнные тесты',
    value: `${browserSettings.chrome} && ${browserSettings.chromeMobile}`,
  },
  [checkTypes]: {
    title: 'Проверка типизации',
    value: 'npx tsc',
  },
  [testCommand]: {
    title: 'Запуск тестов',
    value: 'set CI=true && npx jest --config ./config/jest/jest.config.js',
  },
  [CRABuildCommand]: {
    title: 'Сборка create-react-app',
    value:
      'set CI=true && npx cross-env SKIP_PREFLIGHT_CHECK=true react-app-rewired build',
  },
  [moduleBuildCommand]: {
    title: 'Сборка platform-module',
    value:
      'set CI=true && rm -fr ./build && npx cross-env NODE_ENV=production npx webpack --display errors-only --config ./config/webpack/platform/production/webpack.config.js',
  },
  [testCoverateCommand]: {
    title: 'Покрытие тестами',
    value:
      'set CI=true && npx jest --config ./config/jest/jest.config.js --coverage',
  },
  [fullCheckCommand]: {
    title: 'Запуск всех проверок',
    value: `node ./cli/_utils/ci-utils/executor.js --command=${testCommand} && node ./cli/_utils/ci-utils/executor.js --command=${fullLintCheckCommand} && git add . && node ./cli/_utils/ci-utils/executor.js --command=${checkTypes} && node ./cli/_utils/ci-utils/executor.js --command=${CRABuildCommand} && node ./cli/_utils/ci-utils/executor.js --command=${moduleBuildCommand}`,
  },
  [fullLintCheckCommand]: {
    title: 'Запуск Eslint and Stylelint',
    value:
      'npx eslint src/ --ext .ts,.js,.tsx --fix --max-warnings=0 --cache --cache-location .eslintinfo && npx stylelint --fix --max-warnings=0 "src/**/*.{modules.scss,scss,css}" --cache --cache-location .stylelintinfo',
  },
  [editorconfigCheck]: {
    title: 'Проверка файлов по .editorconfig',
    value: 'npx editorconfig-checker -config config/editorconfig/.ecrc',
  },
};

module.exports = {
  moduleBuildCommand,
  testCommand,
  testCoverateCommand,
  fullCheckCommand,
  fullLintCheckCommand,
  commandsMap,
  fullCheckSystem,
  fullCheckSystemWindows,
};

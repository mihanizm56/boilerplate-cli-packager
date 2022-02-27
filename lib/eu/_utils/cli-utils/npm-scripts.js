const { browserSettings } = require('../get-testcafe-browser-configs');
const {
  OPEN_TEST_COMMANDS_VALUE,
  CLOSE_TEST_COMMANDS_VALUE,
  OPEN_ADDITIONAL_COMMANDS_VALUE,
  CLOSE_ADDITIONAL_COMMANDS_VALUE,
  COMMIT_COMMAND_VALUE,
  OPEN_EXTRA_COMMANDS_VALUE,
  CLOSE_EXTRA_COMMANDS_VALUE,
  COMMIT_COMMAND_LABEL,
  DOCKER_BUILD_COMMAND_LABEL,
  NPM_VULNERABILITIES_COMMAND_LABEL,
  NPM_VULNERABILITIES_COMMAND_VALUE,
  dockerPort,
} = require('./_constants');

module.exports.mainCommands = [
  {
    label: 'Запуск клиентской части приложения',
    value: 'react-app-rewired start',
    type: 'npx cross-env SKIP_PREFLIGHT_CHECK=true',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: COMMIT_COMMAND_LABEL,
    value: COMMIT_COMMAND_VALUE,
    type: 'git',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск сборки приложения (CRA)',
    value: 'react-app-rewired build',
    type: 'npx cross-env SKIP_PREFLIGHT_CHECK=true',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск сборки приложения (Platform)',
    value: 'module-build',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Проверка наличия обновлений @wildberries/portal-routes',
    value: 'cli/_utils/portal-routes-check/npm-package-updater.js',
    type: 'node',
    isDetached: true,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Открыть список тестовых команд',
    value: OPEN_TEST_COMMANDS_VALUE,
  },
  {
    label: 'Открыть список дополнительных команд',
    value: OPEN_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Открыть список деплой команд',
    value: OPEN_EXTRA_COMMANDS_VALUE,
  },
];

module.exports.testCommands = [
  {
    label: 'Назад',
    value: CLOSE_TEST_COMMANDS_VALUE,
  },
  {
    label: NPM_VULNERABILITIES_COMMAND_LABEL,
    value: NPM_VULNERABILITIES_COMMAND_VALUE,
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск тестов',
    value: 'test',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Проверка типов',
    value: 'check-types',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Запуск проверки eslint и stylelint',
    value: 'lint-full',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Запуск интеграционных тестов в ручном режиме',
    value: `react-app-rewired build && ${browserSettings.manualConfig}`,
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Проверка файлов по .editorconfig',
    value: './cli/_utils/ci-utils/executor.js --command=editorconfig-check',
    type: 'node',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск интеграционных тестов в ci режиме',
    value:
      'react-app-rewired build && node ./cli/_utils/ci-utils/executor.js --command=integration-tests',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск тестов с обновлением snapshots',
    value: 'jest --config ./config/jest/jest.config.js -u',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
];

module.exports.additionalCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Запуск приложения в режиме интеграции c платформой',
    value:
      'cross-env NODE_ENV=production npx webpack --display errors-only --config config/webpack/platform/development/webpack-dev.config.js --watch',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск мок-сервера',
    value: './server/app.js',
    type: 'node',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Обновление до конфигурации нового каркаса',
    value: 'cli/_utils/update-to-mod.js --mod="euro"',
    type: 'node',
    isDetached: true,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Обновление до конфигурации текущего каркаса',
    value: 'cli/_utils/update-to-mod.js --mod="ru"',
    type: 'node',
    isDetached: true,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label:
      'Запуск приложения в тестовом режиме с мок-сервером (linux and macOs only)',
    value:
      'concurrently --kill-others-on-fail "npx cross-env SKIP_PREFLIGHT_CHECK=true react-app-rewired start" "nodemon ./server/app.js"',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск изменения package-lock.json в соответствии с "resolutions"',
    value: 'npm-force-resolutions && npm i --legacy-peer-deps --no-audit',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
];

module.exports.extraCommands = [
  {
    label: 'Назад',
    value: CLOSE_EXTRA_COMMANDS_VALUE,
  },
  {
    label: DOCKER_BUILD_COMMAND_LABEL,
    value: `build -t test -f ./config/deploy/Dockerfile ./ && docker run -it -p ${dockerPort}:443 test`,
    type: 'docker',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Деплой проекта',
    value: '@mihanizm56/deploy-tag',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
];

const { browserSettings } = require('../get-testcafe-browser-configs');
const {
  OPEN_TEST_COMMANDS_VALUE,
  CLOSE_TEST_COMMANDS_VALUE,
  OPEN_ADDITIONAL_COMMANDS_VALUE,
  CLOSE_ADDITIONAL_COMMANDS_VALUE,
  COMMIT_COMMAND_VALUE,
} = require('./_constants');

module.exports.mainCommands = [
  {
    label: 'Запуск клиентской части приложения',
    value: 'react-app-rewired start',
    type: 'SKIP_PREFLIGHT_CHECK=true npx',
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Добавить все изменения и сделать коммит',
    value: COMMIT_COMMAND_VALUE,
    type: 'git',
    isInteractiveScript: true,
    isCiScript: false,
  },
  {
    label: 'Запуск сборки приложения',
    value: 'react-app-rewired build',
    type: 'SKIP_PREFLIGHT_CHECK=true npx',
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск мок-сервера',
    value: 'server/app.js',
    type: 'node',
    isInteractiveScript: true,
    isCiScript: false,
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
    label: 'Открыть список тестовых команд',
    value: OPEN_TEST_COMMANDS_VALUE,
  },
  {
    label: 'Открыть список дополнительных команд',
    value: OPEN_ADDITIONAL_COMMANDS_VALUE,
  },
];

module.exports.testCommands = [
  {
    label: 'Назад',
    value: CLOSE_TEST_COMMANDS_VALUE,
  },
  {
    label: 'Запуск тестов',
    value: 'test',
    type: 'ci',
    isIOInherit: false,
    withLoader: true,
    isCiScript: true,
  },
  {
    label: 'Запуск проверки eslint и stylelint',
    value: 'lint-full',
    type: 'ci',
    isIOInherit: false,
    withLoader: true,
    isCiScript: true,
  },
  {
    label: 'Запуск интеграционных тестов в ручном режиме',
    value: `cli/_utils/ci-utils/executor.js --command=build && ${browserSettings.manualConfig}`,
    type: 'node',
    isIOInherit: false,
    withLoader: false,
    isCiScript: false,
  },
  {
    label: 'Запуск интеграционных тестов в ci режиме',
    value:
      'cli/_utils/ci-utils/executor.js --command=build && node ./cli/_utils/ci-utils/executor.js --command=integration-tests',
    type: 'node',
    isInteractiveScript: true,
    isCiScript: false,
  },
];

module.exports.additionalCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Запуск отображения покрытия тестами',
    value: 'jest --coverage',
    type: 'npx',
    isInteractiveScript: true,
    isCiScript: false,
  },
  {
    label: 'Запуск изменения package-lock.json в соответствии с "resolutions"',
    value: 'npm-force-resolutions && npm i --no-audit --legacy-peer-deps',
    type: 'npx',
    isInteractiveScript: true,
    isCiScript: false,
  },
];

const { browserSettings } = require('../get-testcafe-browser-configs');
const {
  OPEN_TEST_COMMANDS_VALUE,
  CLOSE_TEST_COMMANDS_VALUE,
  OPEN_ADDITIONAL_COMMANDS_VALUE,
  CLOSE_ADDITIONAL_COMMANDS_VALUE,
  COMMIT_COMMAND_VALUE,
  OPEN_EXTRA_COMMANDS_VALUE,
} = require('./_constants');

module.exports.mainCommands = [
  {
    label: 'Запуск клиентской части приложения',
    value: 'react-app-rewired start',
    type: 'npx',
    isIOInherit: true,
    withLoader: false,
    isCiScript: false,
  },
  {
    label: 'Сделать коммит',
    value: COMMIT_COMMAND_VALUE,
    type: 'git',
    isIOInherit: true,
    withLoader: false,
    isCiScript: false,
  },
  {
    label: 'Запуск сборки приложения',
    value: 'build',
    type: 'ci',
    isIOInherit: false,
    withLoader: true,
    isCiScript: true,
  },
  {
    label: 'Запуск приложения в тестовом режиме с мок-сервером',
    value:
      'concurrently --kill-others-on-fail "npx react-app-rewired start" "nodemon server/app.js"',
    type: 'npx',
    isIOInherit: true,
    withLoader: false,
    isCiScript: false,
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
    isIOInherit: true,
    withLoader: false,
    isCiScript: false,
  },
];

module.exports.additionalCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Анализ зависимостей (только при наличии папки build)',
    value: 'source-map-explorer "build/static/js/*.js"',
    type: 'npx',
    isIOInherit: true,
    withLoader: false,
    isCiScript: false,
  },
  {
    label: 'Запуск отображения покрытия тестами',
    value: 'jest --coverage',
    type: 'npx',
    isIOInherit: true,
    withLoader: false,
    isCiScript: false,
  },
  {
    label: 'Запуск сборки приложения напрямую',
    value: 'CI=true && npx react-app-rewired build',
    type: 'set',
    isIOInherit: true,
    withLoader: false,
    isCiScript: false,
  },
  {
    label: 'Убить процессы на портах 3000-3003,5000-5003,8000,8080',
    value: 'cli/_utils/cli-utils/process-killer',
    type: 'node',
    isCiScript: false,
    withLoader: false,
    isIOInherit: true,
  },
  {
    label: 'Запуск изменения package-lock.json в соответствии с "resolutions"',
    value: 'npm-force-resolutions && npm i',
    type: 'npx',
    isIOInherit: true,
    withLoader: false,
    isCiScript: false,
  },
];

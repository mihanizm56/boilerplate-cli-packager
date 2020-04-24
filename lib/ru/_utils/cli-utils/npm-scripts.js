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
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Сделать коммит',
    value: COMMIT_COMMAND_VALUE,
    type: 'git',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск всех прекоммит-проверок',
    value: 'check-full',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Запуск сборки приложения',
    value: 'build',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Запуск сервера статики в продакшен режиме',
    value: './server/static',
    type: 'node',
    isDetached: false,
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
  {
    label: 'Открыть список временных вспомогательных команд',
    value: OPEN_EXTRA_COMMANDS_VALUE,
  },
];

module.exports.testCommands = [
  {
    label: 'Назад',
    value: CLOSE_TEST_COMMANDS_VALUE,
  },
  {
    label: 'Анализ уязвимостей npm пакетов',
    value: 'check-npm-packages',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Запуск тестов',
    value: 'test',
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
    label: 'Запуск integration тестов в ручном режиме',
    value:
      'config/env/make-runtime-config.js && npx cross-env SERVER_PORT=5005 IP_LIMIT=1000§ testcafe chrome ./integration-tests -a "node ./server/static.js"',
    type: 'node',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск integration тестов в ci режиме',
    value: './cli/_utils/ci-utils/executor.js --command=integration-tests',
    type: 'node',
    isDetached: false,
    isCiScript: false,
  },
];

module.exports.additionalCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Запуск приложения в тестовом режиме с мок-сервером',
    value:
      'concurrently --kill-others-on-fail "npx react-app-rewired start" "node ./server/app.js"',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Анализ зависимостей (только при наличии папки build)',
    value: 'source-map-explorer "build/static/js/*.js"',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск отображения покрытия тестами',
    value: 'jest --coverage',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск приложения в тестовом режиме с мок-сервером',
    value:
      'concurrently --kill-others-on-fail "npx react-app-rewired start" "node ./server/app.js"',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Анализ зависимостей (только при наличии папки build)',
    value: 'source-map-explorer "build/static/js/*.js"',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск отображения покрытия тестами',
    value: 'jest --coverage',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
];

module.exports.extraCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Запуск сборки приложения напрямую',
    value: 'CI=true && npx react-app-rewired build',
    type: 'set',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск изменения package-lock.json в соответствии с "resolutions"',
    value: 'npm-force-resolutions && npm i',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
];
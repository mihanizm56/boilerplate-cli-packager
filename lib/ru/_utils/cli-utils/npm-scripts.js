const {
  OPEN_TEST_COMMANDS_VALUE,
  CLOSE_TEST_COMMANDS_VALUE,
  OPEN_ADDITIONAL_COMMANDS_VALUE,
  CLOSE_ADDITIONAL_COMMANDS_VALUE,
  COMMIT_COMMAND_VALUE,
  OPEN_EXTRA_COMMANDS_VALUE,
  COMMIT_COMMAND_LABEL,
  DOCKER_BUILD_COMMAND_LABEL,
  NPM_VULNERABILITIES_COMMAND_LABEL,
  NPM_VULNERABILITIES_COMMAND_VALUE,
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
    label: COMMIT_COMMAND_LABEL,
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
    label: 'Запуск сервера статики в продакшен режиме',
    value: 'config/production-server/static.js',
    type: 'node',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск сборки приложения',
    value: 'react-app-rewired build',
    type: 'npx',
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
    label: 'Запуск проверки eslint и stylelint',
    value: 'lint-full',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Запуск integration тестов в ручном режиме',
    value:
      'config/deploy/make-runtime-config.js && npx cross-env SERVER_PORT=5005 IP_LIMIT=1000 testcafe chrome:headless ./integration-tests -a "node config/production-server/static.js"',
    type: 'node',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск integration тестов в ci режиме',
    value: 'integration-tests',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
];

module.exports.additionalCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Запуск изменения package-lock.json в соответствии с "resolutions"',
    value: 'npm-force-resolutions && npm i',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск мок-сервера',
    value: './server/app.js',
    type: 'node',
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
    label: 'Анализ зависимостей',
    value:
      'react-app-rewired build && npx source-map-explorer "build/static/js/*.js"',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск отображения покрытия тестами',
    value: 'jest --config ./config/jest/jest.config.js --coverage',
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
    label: DOCKER_BUILD_COMMAND_LABEL,
    value: 'docker build -t test -f ./config/deploy/Dockerfile .',
    type: 'sudo',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Деплой проекта на test стенд',
    value: 'deploy-test',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Деплой проекта на stage стенд',
    value: 'deploy-stage',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Деплой проекта на test и stage стенды',
    value: 'deploy-full-tests',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Деплой проекта на test stage datapro dataline стенды',
    value: 'deploy-full',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
];

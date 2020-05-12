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
    label: 'Запуск сборки приложения',
    value: 'build',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
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
];

module.exports.additionalCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Запуск мок-сервера приложения',
    value: 'nodemon ./mock-api-server/app.js',
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
    value: 'jest --config ./config/jest/jest.config.js --coverage',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск приложения в тестовом режиме с мок-сервером',
    value:
      'concurrently --kill-others-on-fail "npx react-app-rewired start" "node ./mock-api-server/app.js"',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
];

module.exports.extraCommands = [
  {
    label: 'Назад',
    value: CLOSE_EXTRA_COMMANDS_VALUE,
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

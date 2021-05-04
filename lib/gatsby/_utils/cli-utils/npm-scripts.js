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
  dockerPort,
} = require('./_constants');

module.exports.mainCommands = [
  {
    label: 'Запуск клиентской части приложения',
    value: 'gatsby develop -p 3000',
    type: 'npx',
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
    label: 'Запуск сборки приложения',
    value: ' -fr build && npx gatsby build --prefix-paths',
    type: 'rm',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск сервера статики',
    value: 'gatsby serve --prefix-paths -p 5000',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Скачать и обновить переводы',
    value: 'utils/dictionary-generator',
    type: 'node',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  // {
  //   label: 'Проверка наличия обновлений sdk-api',
  //   value: 'cli/_utils/sdk-api/npm-package-updater.js',
  //   type: 'node',
  //   isDetached: true,
  //   isCiScript: false,
  //   isInteractiveScript: true,
  // },
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
];

module.exports.additionalCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },

  {
    label: 'Запуск мок-сервера',
    value: './server/app.js',
    type: 'node',
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
    value: `build -t test -f ./config/deploy/Dockerfile ./ && docker run -it -p ${dockerPort}:80 test`,
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
